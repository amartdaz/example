import React from "react";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="author" content="Alba Martínez Díaz" />
      <meta name="description" content="Aplicación ejemplo" />
      <meta name="robots" content="noindex,nofollow" />
      <meta
        httpEquiv="cache-control"
        content="no-cache, no-store, must-revalidate"
      />
      <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      <link rel="icon" href="./favicon.ico" type="image/x-icon" sizes="any" />
      <meta property="og:title" content="Example" />
    </head>
  );
}
