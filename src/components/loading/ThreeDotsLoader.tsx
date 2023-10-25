import React from 'react'
import ContentLoader from 'react-content-loader'

const ThreeDotsLoader = () => (
    <div className="text-center">
        <ContentLoader
            width={1980}
            height={1280}
            viewBox="0 0 1980 1280"
            backgroundColor="transparent"
        >
            <circle cx="150" cy="86" r="8"/>
            <circle cx="194" cy="86" r="8"/>
            <circle cx="238" cy="86" r="8"/>
        </ContentLoader>
    </div>
)

export default ThreeDotsLoader