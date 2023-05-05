/** 투두 상태 인터페이스 */
export interface TodoInterface {
    id?: number
    title?: string;
    index?: number;
}

/** home 바텀시트 인터페이스 */
export type eventType = 'set' | 'update'
