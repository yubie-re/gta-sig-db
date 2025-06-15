export const prerender = true;
import type { PageLoad } from './$types';
import type { ProcessedSignature, SignatureData } from './sig-types';
import pcrosData from '../../../sig-workflow/sig_db_pcros.json';
import pcrosaltData from '../../../sig-workflow/sig_db_pcrosalt.json';


function timeConverter(unix: number): string {
	return new Date(unix * 1000).toISOString().substring(0, 10);
}

function flagToString(flag: number): string {
	switch (flag) {
		case 0x10:
			return "X";
		case 0x20:
			return "RX";
		case 0x40:
			return "RWX";
		case 0x80:
			return "RWXC";
		case 1:
			return "NA";
		case 2:
			return "R";
		case 4:
			return "RW";
		case 8:
			return "RC";
		default:
			return "UNK";
	}
}

function escapeHtml(unsafe: string): string {
	return unsafe;
}

interface SignatureDatabase {
	RTMA: SignatureData[];
	INTG: SignatureData[];
}

interface ProcessedSignatureDataBase {
	rtmaData: ProcessedSignature[];
	intgData: ProcessedSignature[];
};

function loadJson(data : SignatureDatabase) : ProcessedSignatureDataBase {
	let rtmaData: ProcessedSignature[] = [];
    let intgData: ProcessedSignature[] = [];
	if (data.RTMA) {
		rtmaData = data.RTMA.map((dat) => ({
			firstByte:
				String.fromCharCode(dat.m_firstByte) +
				" - 0x" +
				dat.m_firstByte.toString(16),
			size: dat.m_len,
			hash: dat.m_hash,
			pageLow: dat.m_pageLow,
			pageHigh: dat.m_pageHigh,
			flags: dat.m_protFlags
				? flagToString(dat.m_protFlags)
				: undefined,
			moduleSize: dat.m_moduleSize,
			time: timeConverter(dat.time),
			build: dat.build,
			translation: dat.translation
				? escapeHtml(dat.translation)
				: "",
		}));
	}

	if (data.INTG) {
		intgData = data.INTG.map((dat) => ({
			firstByte:
				String.fromCharCode(dat.m_firstByte) +
				" - 0x" +
				dat.m_firstByte.toString(16),
			size: dat.m_len,
			hash: dat.m_hash,
			pageLow: dat.m_pageLow,
			pageHigh: dat.m_pageHigh,
			time: timeConverter(dat.time),
			build: dat.build,
			translation: dat.translation
				? escapeHtml(dat.translation)
				: "",
		}));
	}

	return {
		rtmaData,
		intgData
	}
}

export const load: PageLoad = async () => { 

	return {
		pcros : loadJson(pcrosData),
		pcrosalt : loadJson(pcrosaltData)
	};
};