import React from 'react'
import { Skeleton } from '@mui/material'

export default function FormSkeleton() {
    return (
        <>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} style={{margin: "20px"}}/>
            <Skeleton variant="circular" width={200} height={200} style={{margin: "20px"}}/>
            <Skeleton variant="rectangular" height={100} style={{margin: "20px"}}/>
            <Skeleton variant="rounded" height={60} style={{margin: "20px"}}/>
        </>
    )
}
