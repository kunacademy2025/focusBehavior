// import // getOrganizationSolutions,
// getIndividualSolutions,
// getComplementingSolutions,
// getCoursesWithPagination,
// getBlogsWithPagination,
// getCaseStudiesWithPagination,
// getTeamMembersWithPagination,
// "@/actions";

export const modules: Array<{
  fetcher: (
    pageSize?: number,
    pageIndex?: number,
    lang?: string
  ) => Promise<unknown>;
  formatter: (slug?: string, lang?: string) => string;
}> = [
  // { fetcher: getOrganizationSolutions, formatter: path.organization },
  // { fetcher: getIndividualSolutions, formatter: path.individual },
  // { fetcher: getComplementingSolutions, formatter: path.solutions },
  // { fetcher: getCoursesWithPagination, formatter: path.training },
  // { fetcher: getBlogsWithPagination, formatter: path.blog },
  // { fetcher: getCaseStudiesWithPagination, formatter: path.caseStudies },
  // { fetcher: getTeamMembersWithPagination, formatter: path.team },
];
