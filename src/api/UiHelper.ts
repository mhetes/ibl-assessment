import { EFragmentType } from '../model/EFragmentType';
import type { ReportFragment } from '../model/ReportFragment';

/**
 * Formats specified date with Slovak locale
 * @param date ISO formatted date
 * @returns Slovak locale formatted date
 */
export const formatDate = (date: string): string => {
    return Intl.DateTimeFormat('sk-SK', { dateStyle: 'short', timeStyle: 'medium' }).format(new Date(date));
};

/**
 * Parses Meteo report text into ReportFragment for distinguishing use of standard/red/blue text color and new line
 * @param reportText Meteorogical report text from OPMET service
 * @returns Report fragments to be processed into React tags
 */
export const parseReportFragmets = (reportText: string): ReportFragment[] => {
    let textBuffer = '';
    const fragments: ReportFragment[] = [];

    const flushTextBuffer = (): void => {
        if (textBuffer.length > 0) {
            fragments.push({ type: EFragmentType.normal, text: textBuffer });
            textBuffer = '';
        }
    };

    // Clear '\r' chars and limit multiple '\n' line breaks in a row to one and separate report by lines
    const lines = reportText.replace(/\r/g, '').replace(/\n{2,}/g, '\n').split('\n');
    lines.forEach((line, l) => {
        // On subsequent lines: Add line break
        if (l > 0) {
            flushTextBuffer();
            fragments.push({ type: EFragmentType.line, text: '' });
        }
        line.split(' ').forEach((word, w) => {
            // If not first word on line add space. If second space in row, add non-breakable space character
            if (w > 0) 
                textBuffer += (textBuffer[textBuffer.length - 1] === ' ') ? '\u00A0' : ' ';
            // Should word be colorized?
            if (word.match(/^(BKN|FEW|SCT)\d{3}/)) {
                // add colorized fragment according to numeric value
                const parsedNum = parseInt(word.substring(3, 6));
                if (parsedNum <= 30) {
                    flushTextBuffer();
                    fragments.push({ type: EFragmentType.blue, text: word });
                } else if (parsedNum > 30) {
                    flushTextBuffer();
                    fragments.push({ type: EFragmentType.red, text: word });
                } else {
                    // If failed to parse number (NaN), just use black color for this fragment
                    textBuffer += word;
                }
            } else {
                textBuffer += word;
            }
        });
    });
    flushTextBuffer();
    return fragments;
}