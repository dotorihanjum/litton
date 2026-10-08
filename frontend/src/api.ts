type ApiErrorResponse = {
  detail: string;
};

export type CourseListRequest = {
  interests: string;
};

export type CourseListResponse = {
  course_list: string;
};

export type SchoolListRequest = {
  course: string;
};

export type SchoolListResponse = {
  school_list: string;
};

export type CurriculumListRequest = {
  school: string;
  course: string;
};

export type CurriculumListResponse = {
  curriculum_list: string[];
};

export class ApiError extends Error {
  status: number;

  constructor(status: number, detail: string) {
    super(detail);
    this.name = "ApiError";
    this.status = status;
  }
}

async function post<TRequest extends object, TResponse extends object>(
  path: string,
  body: TRequest,
  signal?: AbortSignal,
): Promise<TResponse> {
  const response = await fetch(`/api${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal,
  });

  const data = (await response.json()) as TResponse | ApiErrorResponse;

  if (!response.ok) {
    const detail =
      "detail" in data ? data.detail : "요청을 처리하지 못했습니다.";

    throw new ApiError(response.status, detail);
  }

  return data as TResponse;
}

export function getCourseList(
  interests: string,
  signal?: AbortSignal,
): Promise<CourseListResponse> {
  return post<CourseListRequest, CourseListResponse>(
    "/course_list",
    { interests },
    signal,
  );
}

export function getSchoolList(
  course: string,
  signal?: AbortSignal,
): Promise<SchoolListResponse> {
  return post<SchoolListRequest, SchoolListResponse>(
    "/school_list",
    { course },
    signal,
  );
}

export function getCurriculumList(
  school: string,
  course: string,
  signal?: AbortSignal,
): Promise<CurriculumListResponse> {
  return post<CurriculumListRequest, CurriculumListResponse>(
    "/curriculum_list",
    { school, course },
    signal,
  );
}
