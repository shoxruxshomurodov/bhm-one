import * as React from "react";
import { useHistory } from "react-router";
import { Button, Result } from "antd";

export default function AccessDenied() {
  const history = useHistory();
  return (
    <Result
      status="403"
      title={<span className="mode-text-dark">Доступ запрешен</span>}
      subTitle={<span className="mode-text-dark" >У вас нету доступа на данную страницу</span>}
      extra={
        <Button type="primary" onClick={() => history.push("/home")}>
          Перейти на главную страницу
        </Button>
      }
    />
  );
}
