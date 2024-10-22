export interface BaseResponse<T> {
  data: T | null;
  error: boolean;
  errorMessage: string;
}
//: Promise<BaseResponse<T>>
export async function post<T>(
  url: string,
  body: object
): Promise<BaseResponse<T>> {
  const response = await fetch("http://localhost:3000/api/" + url, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer `,
    },
    body: JSON.stringify(body),
  });
  const jsonData = await response.json();

  if (!response.ok || response.status > 299 || response.status < 200) {
    return { data: null, error: true, errorMessage: jsonData.message };
  } else {
    return { data: jsonData, error: false, errorMessage: "" };
  }
}
