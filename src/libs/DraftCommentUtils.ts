import type {OnyxCollection, OnyxEntry} from 'react-native-onyx';
import Onyx from 'react-native-onyx';
import ONYXKEYS from '@src/ONYXKEYS';
import { DraftReportComments } from '@src/types/onyx';

let draftCommentCollection: OnyxEntry<DraftReportComments> = {};
Onyx.connect({
    key: ONYXKEYS.NVP_DRAFT_REPORT_COMMENTS,
    callback: (nextVal) => {
        draftCommentCollection = nextVal;
    },
});

/**
 * Returns a draft comment from the onyx collection for given reportID.
 * Note: You should use the HOCs/hooks to get onyx data, instead of using this directly.
 * A valid use-case of this function is outside React components, like in utility functions.
 */
function getDraftComment(reportID: string): OnyxEntry<string> | null | undefined {
    return draftCommentCollection?.[reportID];
}

/**
 * Returns true if the report has a valid draft comment.
 * A valid draft comment is a non-empty string.
 */
function isValidDraftComment(comment?: string | null): boolean {
    return !!comment;
}

/**
 * Returns true if the report has a valid draft comment.
 * @deprecated prefer useOnyx to access when possible
 */
function hasValidDraftComment(reportID: string): boolean {
    return isValidDraftComment(getDraftComment(reportID));
}

/**
 * Prepares a draft comment by returning null if it's empty.
 */
function prepareDraftComment(comment: string | null) {
    // logical OR is used to convert empty string to null
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return comment || null;
}

export {getDraftComment, isValidDraftComment, hasValidDraftComment, prepareDraftComment};
