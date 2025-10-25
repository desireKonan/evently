/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_EVENTLY_URL: string
    readonly VITE_SMS_PREFIX: string
    readonly VITE_CURRENCY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}