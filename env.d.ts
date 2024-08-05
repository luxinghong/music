import type { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider';
export * from 'naive-ui/volar';
export { };

export type AnyObject = {
    [key: string]: any;
}

declare global {
    interface Window {
        $message: MessageApiInjection;
    }

    interface ImportMeta {
        env: Record<string, string>
    }
}