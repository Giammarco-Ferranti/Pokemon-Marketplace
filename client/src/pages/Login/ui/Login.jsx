import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/Auth/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginLogic } from "../Logic/useLogicLogic";
import * as S from "./Login.classes.js";

const Login = () => {
  const { setEmail, setPassword, mutationSubmit } = useLoginLogic();

  return (
    <div className={S.loginWrapper}>
      <Card className={S.loginCard}>
        <CardHeader>
          <CardTitle className={S.loginCardTitle}>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutationSubmit.mutateAsync();
            }}
          >
            <div className={S.formWrapper}>
              <div className={S.formWrapper}>
                <Label htmlFor="email">Email</Label>
                <Input
                  required
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={S.formWrapper}>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className={S.cardFooter}>
            Don&apos;t have an account?{" "}
            <Link to={"/registration"} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
