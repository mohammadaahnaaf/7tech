import React from 'react'

export function ErrorText({ error }) {
    return error ? (
        <div className="p-3 my-2 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            <span className="font-medium">Warning!</span> {error}
        </div>
    ) : null
}