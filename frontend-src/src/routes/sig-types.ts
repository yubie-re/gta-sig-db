export interface SignatureData {
    m_firstByte: number;
    m_len: number;
    m_hash: number;
    m_pageLow: number;
    m_pageHigh: number;
    m_protFlags?: number;
    m_moduleSize?: number;
    time: number;
    build: number;
    translation?: string;
    m_unk1?: number;
    m_unk2?: number;
}

export interface ProcessedSignature {
    firstByte: string;
    size: number;
    hash: number;
    pageLow: number;
    pageHigh: number;
    flags?: string;
    moduleSize?: number;
    time: string;
    build: number;
    translation: string;
}