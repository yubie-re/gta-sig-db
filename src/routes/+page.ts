export interface SignatureData {
    m_firstByte: number;
    m_len: number;
    m_hash: string;
    m_pageLow: number;
    m_pageHigh: number;
    m_protFlags?: number;
    m_moduleSize?: number;
    time: number;
    build: string;
    translation?: string;
}

export interface ProcessedSignature {
    firstByte: string;
    size: number;
    hash: string;
    pageLow: number;
    pageHigh: number;
    flags?: string;
    moduleSize?: number;
    time: string;
    build: string;
    translation: string;
}
