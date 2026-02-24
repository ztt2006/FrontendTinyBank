import { useState, useEffect, useCallback } from "react";
import { searchQuestionsAPI } from "@/api/question";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ChevronLeft, ChevronRight, FileQuestion, Loader2 } from "lucide-react";
import styles from "./index.module.css";

type UserVO = {
  createTime?: string;
  id?: number;
  userAvatar?: string;
  userName?: string;
  userProfile?: string;
  userRole?: string;
};

type QuestionVO = {
  answer?: string;
  content?: string;
  createTime?: string;
  id?: number;
  tags?: string[];
  title?: string;
  updateTime?: string;
  user?: UserVO;
  userId?: number;
};

type QuestionQueryRequest = {
  answer?: string;
  content?: string;
  current?: number;
  id?: number;
  notId?: number;
  pageSize?: number;
  questionBankId?: number;
  searchText?: string;
  sortField?: string;
  sortOrder?: string;
  tags?: string[];
  title?: string;
  userId?: number;
};

interface Props {
  defaultQuestionList?: QuestionVO[];
  defaultTotal?: number;
  defaultSearchParams?: QuestionQueryRequest;
}

const PAGE_SIZE = 12;

const QuestionTable = (props: Props) => {
  const { defaultSearchParams } = props;
  const [questionList, setQuestionList] = useState<QuestionVO[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>(defaultSearchParams?.searchText || "");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchQuestions = useCallback(async (page: number, search: string) => {
    setLoading(true);
    try {
      const { data, code } = await searchQuestionsAPI({
        ...defaultSearchParams,
        current: page,
        pageSize: PAGE_SIZE,
        searchText: search,
        sortField: "createTime",
        sortOrder: "descend",
      });
      if (code === 0) {
        setQuestionList(data?.records || []);
        setTotal(data?.total || 0);
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  }, [defaultSearchParams]);

  useEffect(() => {
    fetchQuestions(currentPage, searchText);
  }, [currentPage, fetchQuestions]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchQuestions(1, searchText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // 标签组件
  const TagList = ({ tags }: { tags?: string[] }) => {
    if (!tags || tags.length === 0) return <span className={styles.noTag}>-</span>;
    return (
      <div className={styles.tagList}>
        {tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="secondary" className={styles.tag}>
            {tag}
          </Badge>
        ))}
        {tags.length > 3 && (
          <Badge variant="outline" className={styles.tagMore}>
            +{tags.length - 3}
          </Badge>
        )}
      </div>
    );
  };

  // 骨架屏加载
  const LoadingSkeleton = () => (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <TableRow key={i} className={styles.tableRow}>
          <TableCell className={styles.skeletonRow}>
            <Skeleton className={styles.skeletonTitle} />
          </TableCell>
          <TableCell className={`${styles.skeletonRow} hidden md:table-cell`}>
            <div className={styles.skeletonTags}>
              <Skeleton className={styles.skeletonTag} />
              <Skeleton className={styles.skeletonTag} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  // 空状态
  const EmptyState = () => (
    <TableRow>
      <TableCell colSpan={2}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <FileQuestion className="h-8 w-8" />
          </div>
          <div className="text-center">
            <p className={styles.emptyTitle}>暂无题目数据</p>
            <p className={styles.emptySubtitle}>试试调整搜索条件</p>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        {/* 头部 */}
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <h2 className={styles.title}>题目列表</h2>
            <span className={styles.subtitle}>
              {loading ? "加载中..." : total > 0 ? `共 ${total} 题` : "暂无数据"}
            </span>
          </div>
          
          {/* 搜索栏 */}
          <div className={styles.searchWrap}>
            <div className={styles.searchInputWrap}>
              <Search className={styles.searchIcon} />
              <Input
                placeholder="搜索题目..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyPress}
                className={styles.searchInput}
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={loading}
              className={styles.searchBtn}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "搜索"}
            </Button>
          </div>
        </div>

        {/* 桌面端表格 */}
        <div className={`${styles.tableWrap} hidden sm:block`}>
          <Table>
            <TableHeader className={styles.tableHeader}>
              <TableRow>
                <TableHead className={`${styles.tableHeaderCell} w-[65%]`}>标题</TableHead>
                <TableHead className={styles.tableHeaderCell}>标签</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <LoadingSkeleton />
              ) : questionList.length === 0 ? (
                <EmptyState />
              ) : (
                questionList.map((question) => (
                  <TableRow key={question.id} className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>
                      <Link to={`/question/${question.id}`} className={styles.questionLink}>
                        {question.title}
                      </Link>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <TagList tags={question.tags} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* 移动端列表 */}
        <div className={`${styles.mobileList} sm:hidden`}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.mobileItem}>
                <Skeleton className={styles.skeletonTitle} />
                <div className={styles.skeletonTags}>
                  <Skeleton className={styles.skeletonTag} />
                  <Skeleton className={styles.skeletonTag} />
                </div>
              </div>
            ))
          ) : questionList.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <FileQuestion className="h-8 w-8" />
              </div>
              <p className={styles.emptyTitle}>暂无题目数据</p>
              <p className={styles.emptySubtitle}>试试调整搜索条件</p>
            </div>
          ) : (
            questionList.map((question) => (
              <div key={question.id} className={styles.mobileItem}>
                <Link to={`/question/${question.id}`} className={styles.mobileLink}>
                  {question.title}
                </Link>
                <TagList tags={question.tags} />
              </div>
            ))
          )}
        </div>

        {/* 分页 */}
        {total > 0 && (
          <div className={styles.pagination}>
            <p className={`${styles.paginationInfo} hidden sm:block`}>
              第 {(currentPage - 1) * PAGE_SIZE + 1}-{Math.min(currentPage * PAGE_SIZE, total)} 条，共 {total} 条
            </p>
            <p className={`${styles.paginationInfo} sm:hidden`}>
              {currentPage}/{totalPages} 页
            </p>
            <div className={styles.paginationControls}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1 || loading}
                className={styles.pageBtn}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">上一页</span>
              </Button>
              <div className="hidden md:flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      disabled={loading}
                      className={styles.pageNum}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || loading}
                className={styles.pageBtn}
              >
                <span className="hidden sm:inline mr-1">下一页</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionTable;
