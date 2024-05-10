import React from "react";
import { Link } from "react-router-dom";
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
import { useRegistrationLogic } from "../Logic/useRegistrationLogic";
import * as S from "./Registration.classes.js";

const Registration = () => {
  const { setEmail, setPassword, setUsername, mutationSubmit } =
    useRegistrationLogic();

  return (
    <div className={S.registrationWrapper}>
      <Card className={S.card}>
        <CardHeader>
          <CardTitle className={S.cardTitle}>Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className={S.form}
            onSubmit={(e) => {
              e.preventDefault();
              mutationSubmit.mutateAsync();
            }}
          >
            <div className={S.form}>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="user123"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className={S.form}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={S.form}>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
          <div className={S.cardFooter}>
            Already have an account?{" "}
            <Link to={"/login"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
