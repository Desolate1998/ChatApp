import React from 'react'
import'./ThemeButtonStyle.css'


interface IProps{
  visable?:boolean;
}
export const ThemeButton:React.FC<IProps> = ({visable}) => {
    return (
        <svg className="menu-setting" id="svgTheme"  viewBox="0 0 50 50" visibility={visable?'visable':'hidden'} style={visable?{}:{position:'absolute'}}>
                <path id="sun" d="M24.7,38.9c-0.6,0-2.9-0.1-5.5-1.4C18.4,37.1,16,36,14,33.4c-0.9-1.1-3.2-4.1-3.3-8.6
                  c0-0.5,0-2.9,1.2-5.7c0.5-1.2,1.8-3.6,4.4-5.6c1.2-0.9,4.3-3,8.7-2.9c3.6,0,6.2,1.5,7.1,2.1c2.5,1.5,4,3.4,4.5,4.1
                  c0.6,0.9,2.6,3.8,2.6,8c0,5-2.7,8.4-3.5,9.2C35.3,34.5,31.1,39.2,24.7,38.9z"/>
        <g className="sunRays">
              <path id="sunRay1" d="M25.4,47.5c-0.7,0-1.3-0.6-1.3-1.3v-4c0-0.7,0.6-1.3,1.3-1.3c0.7,0,1.3,0.6,1.3,1.3v4
                C26.8,46.9,26.2,47.5,25.4,47.5z"/>
              <path id="sunRay2" d="M25.4,9.2c-0.7,0-1.3-0.6-1.3-1.3v-4c0-0.7,0.6-1.3,1.3-1.3c0.7,0,1.3,0.6,1.3,1.3v4
                C26.8,8.6,26.2,9.2,25.4,9.2z"/>
              <path id="sunRay3" d="M9.9,41.2c-0.3,0-0.7-0.1-0.9-0.4c-0.5-0.5-0.5-1.4,0-1.9l2.8-2.8c0.5-0.5,1.4-0.5,1.9,0
                c0.5,0.5,0.5,1.4,0,1.9l-2.8,2.8C10.6,41,10.2,41.2,9.9,41.2z"/>
              <path id="sunRay4" d="M37,14.1c-0.3,0-0.7-0.1-0.9-0.4c-0.5-0.5-0.5-1.4,0-1.9L38.9,9c0.5-0.5,1.4-0.5,1.9,0
                c0.5,0.5,0.5,1.4,0,1.9l-2.8,2.8C37.7,14,37.3,14.1,37,14.1z"/>
              <path id="sunRay5" d="M12.7,14.1c-0.3,0-0.7-0.1-0.9-0.4l-2.8-2.8c-0.5-0.5-0.5-1.4,0-1.9s1.4-0.5,1.9,0l2.8,2.8
                c0.5,0.5,0.5,1.4,0,1.9C13.4,14,13.1,14.1,12.7,14.1z"/>
              <path id="sunRay6" d="M39.8,41.2c-0.3,0-0.7-0.1-0.9-0.4L36,37.9c-0.5-0.5-0.5-1.4,0-1.9s1.4-0.5,1.9,0l2.8,2.9
                c0.5,0.5,0.5,1.4,0,1.9C40.5,41,40.2,41.2,39.8,41.2z"/>
              <path id="sunRay7" d="M7.4,26.7h-4c-0.7,0-1.3-0.6-1.3-1.3S2.6,24,3.4,24h4c0.7,0,1.3,0.6,1.3,1.3S8.1,26.7,7.4,26.7z"/>
              <path id="sunRay8" d="M45.7,26.7h-4c-0.7,0-1.3-0.6-1.3-1.3s0.6-1.3,1.3-1.3h4c0.7,0,1.3,0.6,1.3,1.3S46.4,26.7,45.7,26.7z"/>
        </g>
        <g id="starGroup" transform="translate(5 0)" >
        <polygon id="star1" points="29.4,25.5 30,27 30.5,25.4 32.4,25.4 30.8,24.5 31.4,22.9 29.9,23.9 28.4,23 29,24.5 
          27.5,25.5 "/>
        <polygon id="star2" points="30.2,29.9 28.9,27.9 28.6,30.2 25.9,30.7 28.4,31.6 28.1,33.9 29.9,32.2 32.4,33.2 
          31,31.2 32.9,29.4 "/>
        <polygon id="star3" points="23.5,29.3 24.6,28.5 25.8,29.3 25.4,28.1 26.5,27.3 25.1,27.3 24.6,26.2 24.2,27.3 
          22.8,27.3 23.9,28.1 "/>
          </g>
        </svg>
      
    )
}
