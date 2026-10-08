# API 명세서

## 공통 규칙
- 모든 주소는 /api 로 시작
- 필드 이름은 snake_case
- 에러 응답 : {"detail": "메시지"}
- 상태코드: 성공 200, 생성 201, 잘못된 요청 400, 서버 에러 500

## API 목록
| # | 이름 | Method | Path | Request | Response | 담당 |
|---|---|---|---|---|---|---|
| 1 | 학과리스트가져오기 | POST | /api/course_list | { "interests": "공학" } | { "course_list": "컴퓨터공학과,인공지능학과,건축공학과"} | OOO |
| 2 | 학교리스트가져오기 | POST | /api/school_list | { "course": "컴퓨터공학과"} | { "school_list": "경희대학교, 고려대학교, 중앙대학교" } | OOO |
| 3 | 커리큘럼가져오기 | POST | /api/curriculum_list | { "school": "경희대학교","course": "컴퓨터공학과"} | { "curriculum_list": [{ "웹파", "DB", "알분", "졸논"}] } | OOO |

## 응답 예시

### 1. POST /api/course_list
요청
{ "interests": "공학" }

응답 200
{ "course_list": "컴퓨터공학과,인공지능학과,건축공학과"}

응답 400
{ "detail": "분야를 작성해주세요."}