import React from 'react'

export function SuccessText({ success }) {
    return success ? (
        <div className="p-3 my-2 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            <span className="font-medium">Success</span> {success}
        </div>
    ) : null
}