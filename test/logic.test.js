/**
 * @jest-environment jsdom
 */
import React from "react";
import {
    update_SessionStorage_favrorite,
    // update_firestoreFavorite
} from "../src/firebase/logic"
import { db, auth, deleteApp, app } from '../src/firebase/firebase'



describe("update_SessionStorage_favrorite", () => {
    afterEach(() => {
        sessionStorage.clear();
    });

    describe("update_SessionStorage_favrorite", () => {
        it("追加", () => {
            update_SessionStorage_favrorite("testId1", true);
            const favorites = JSON.parse(sessionStorage.getItem("favorites"));
            expect(favorites).toEqual(["testId1"]);
        });
        it("3個追加", () => {
            update_SessionStorage_favrorite("testId1", true);
            update_SessionStorage_favrorite("testId2", true);
            update_SessionStorage_favrorite("testId3", true);
            const favorites = JSON.parse(sessionStorage.getItem("favorites"));
            expect(favorites).toEqual(["testId1", "testId2", "testId3"]);
        });
        it("削除", () => {
            update_SessionStorage_favrorite("testId1", false);
            const favorites = JSON.parse(sessionStorage.getItem("favorites"));
            expect(favorites).toEqual([]);
        });
        it("ID重複チェック", () => {
            //同じIDを追加しても追加されない事を確認する
            update_SessionStorage_favrorite("testId1", true);
            update_SessionStorage_favrorite("testId1", true);
            const favorites = JSON.parse(sessionStorage.getItem("favorites"));
            expect(favorites).toEqual(["testId1"]);
        });
    });
});

describe("update_SessionStorage_favrorite", () => {
    afterEach(() => {
        sessionStorage.clear();
    });

    describe("update_SessionStorage_favrorite", () => {
        it("追加", () => {
            update_SessionStorage_favrorite("testId1", true);
            const favorites = JSON.parse(sessionStorage.getItem("favorites"));
            expect(favorites).toEqual(["testId1"]);
        });
        it("3個追加", () => {
            update_SessionStorage_favrorite("testId1", true);
            update_SessionStorage_favrorite("testId2", true);
            update_SessionStorage_favrorite("testId3", true);
            const favorites = JSON.parse(sessionStorage.getItem("favorites"));
            expect(favorites).toEqual(["testId1", "testId2", "testId3"]);
        });
        it("削除", () => {
            update_SessionStorage_favrorite("testId1", false);
            const favorites = JSON.parse(sessionStorage.getItem("favorites"));
            expect(favorites).toEqual([]);
        });
        it("ID重複チェック", () => {
            //同じIDを追加しても追加されない事を確認する
            update_SessionStorage_favrorite("testId1", true);
            update_SessionStorage_favrorite("testId1", true);
            const favorites = JSON.parse(sessionStorage.getItem("favorites"));
            expect(favorites).toEqual(["testId1"]);
        });
    });
});