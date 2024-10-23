export interface BaseResponse<T> {
  data: T | null;
  error: boolean;
  errorMessage: string;
}

export async function post<T>(
  url: string,
  body: object,
  token?: string
): Promise<BaseResponse<T>> {
  const response = await fetch("http://localhost:3000/api/" + url, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

export async function get<T>(
  url: string,
  token: string | null
): Promise<BaseResponse<T>> {
  const response = await fetch("http://localhost:3000/api/" + url, {
    cache: "no-cache",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonData = await response.json();

  if (!response.ok || response.status > 299 || response.status < 200) {
    return { data: null, error: true, errorMessage: jsonData.message };
  } else {
    return { data: jsonData, error: false, errorMessage: "" };
  }
}

export async function put<T>(
  url: string,
  token: string,
  body: object
): Promise<BaseResponse<T>> {
  const response = await fetch("http://localhost:3000/api/" + url, {
    cache: "no-cache",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
