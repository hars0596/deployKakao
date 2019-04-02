import fetch from "isomorphic-fetch";
import { prepareUrl } from './api';
require('dotenv').config({ path: '/home/digimantra/Desktop/backupKakako/backend/Admin/.env' });

const token = localStorage.getItem("jwtToken");

export function fetchMasterList() {
    return fetch(prepareUrl('kakaoMaster/masterList'), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(err => err);
}
export function fetchNoOfCountOfUserByMaster(id) {
    return fetch(prepareUrl(`kakaoMaster/userCount/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(err => err);
}

export function fetchMasterProfile(id) {
    return fetch(prepareUrl(`kakaoMaster/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(err => err);
}

export function fetchParticularMasterUser(id) {
    return fetch(prepareUrl(`kakaoMaster/masterUser/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(err => err);
}

export function fetchParticularGroup(id) {
    return fetch(prepareUrl(`kakaoMaster/masterGroup/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(err => err);
}

export function fetchParticularMasterPhoneBook(id) {
    return fetch(prepareUrl(`kakaoMaster/masterPhonebook/${id}`), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(err => err);
}