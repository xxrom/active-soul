import React from 'react';
import { styled } from 'linaria/react';
import { css } from 'linaria';

const helixSize = 60; // vmin;
const animateDuration = 4;
const numberOfDots = 36;
const dotsPerCircle = numberOfDots;
const dotsPerLoop = dotsPerCircle / 3;

const Dot = (props) => <div>
  {/* <DotCommon first className={one} color={'red'} {...props} />
  <DotCommon second className={two} color={'blue'}{...props} /> */}
  <DotCommon first color={'red'} {...props} />
  <DotCommon second color={'blue'}{...props} />
</div>;

const one = css`
  animation: hide-one ${animateDuration} linear infinite;

  @keyframes hide-one {
      0% {
        z-index: -1;
    }
    24% {
        z-index: -1;
    }
    25% {
        z-index: 1;
    }
    74% {
        z-index: 1;
    }
    75% {
        z-index: -1;
    }
  }
`;

const two = css`
  animation: hide-two ${animateDuration}s linear infinite;

  @keyframes hide-two {
    0% {
        z-index: 1;
    }
    24% {
        z-index: 1;
    }
    25% {
        z-index: -1;
    }
    74% {
        z-index: -1;
    }
    75% {
        z-index: 1;
    }
  }
`;

const DotCommon = styled.div`
  transform: rotate(${props => props.index * 360 / dotsPerCircle}deg);

  position: absolute;
  left: 0;
  top: calc(50% - ${helixSize / 20}vmin);
  height: ${helixSize / 10}vmin  ;
  width: 50%;
  transform-origin: 100% 50%;
  backface-visibility: hidden;

  animation: hide-dot ${animateDuration}s linear infinite;
  animation-delay: ${props =>
    props.first
      ? 0 - (props.index * animateDuration / dotsPerLoop)
      : -(animateDuration / 2) - (props.index * animateDuration / dotsPerLoop)}s;

  &::after {
    background: ${props => props.color};
    content: '';
    display: block;
    height: ${helixSize / 20}vmin;
    width:  ${helixSize / 20}vmin;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    border-radius: 50%;
    backface-visibility: hidden;
    animation: move-dot ${animateDuration}s linear infinite;

    /* animation-delay: ${props =>
    props.first
      ? -props.index * animateDuration / dotsPerLoop
      : -animateDuration / 2 + (-props.index * animateDuration / dotsPerLoop)}s; */
    animation-delay: ${props =>
    props.first
      ? 0 - (props.index * animateDuration / dotsPerLoop)
      : -(animateDuration / 2) - (props.index * animateDuration / dotsPerLoop)}s;
    will-change: transform;
  }
  @keyframes hide-dot {
    0% {
        z-index: 1;
    }
    25% {
        z-index: 1;
    }
    50% {
        z-index: -1;
    }
    75% {
        z-index: -1;
    }
    100% {
        z-index: -1;
    }
  }

  @keyframes move-dot {
    0% {
        transform: translateY(-50%) translateX(0) scale(1);
        animation-timing-function: ease-in;
    }
    25% {
        transform: translateY(-50%) translateX( ${helixSize / 16}vmin ) scale(1.2);
        animation-timing-function: ease-out;
    }
    50% {
        transform: translateY(-50%) translateX(${helixSize / 8}vmin) scale(1);
        animation-timing-function: ease-in;
    }
    75% {
        transform: translateY(-50%) translateX(${helixSize / 16}vmin) scale(0.8);
        animation-timing-function: ease-out;
    }
    100% {
        transform: translateY(-50%) translateX(0) scale(1);
    }
  }
`;


const Background = ({ children }) => {
  const onMove = () => console.log(`moved!`);

  const Dots = [];
  for (let i = 0; i < numberOfDots; i++) {
    Dots.push(<Dot index={i} />);
  }

  console.log(`Dots`, Dots);

  return <BackgroundDiv onMouseMove={onMove}>
    {Dots}
    {children}
  </BackgroundDiv>
}

const BackgroundDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  border: 1px solid gray;
  box-sizing: border-box;


  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  height: ${helixSize}vmin;
  width: ${helixSize}vmin;
  border-radius: 50%;
  background: skyblue;
`
//   .dot {
//     position: absolute;

//     left: 0;
//     top: calc(50% - ${helixSize / 20}vmin);
//     height: ${helixSize / 10}vmin  ;
//     width: 50%;
//     transform-origin: 100% 50%;
//     backface-visibility: hidden;
//     /* animation: update-z-index ${animateDuration}s linear infinite; */

//     /* .mixin-init-dot(0); */
//     &:nth-child(0) {
//         transform: rotate((0 * 360 / ${dotsPerCircle}, deg));

//         &::after {
//             background: #fff;
//         }
//     }

//     &:nth-child(1) {
//         transform: rotate((1 * 360 / ${dotsPerCircle}, deg));

//         &::after {
//             background: #fff;
//         }
//     }

//     &::after {
//         content: '';
//         background: red;
//         display: block;
//         height: ${helixSize / 20}vmin;
//         width:  ${helixSize / 20}vmin;
//         position: absolute;
//         top: 50%;
//         left: 0;
//         transform: translateY(-50%);
//         border-radius: 50%;
//         backface-visibility: hidden;
//         animation: move-dot ${animateDuration}s linear infinite;
//         will-change: transform;
//     }
//   }

//   @keyframes move-dot {
//     0% {
//         transform: translateY(-50%) translateX(0) scale(1);
//         animation-timing-function: ease-in;
//     }

//     25% {
//         transform: translateY(-50%) translateX( ${helixSize / 16}vmin ) scale(1.2);
//         animation-timing-function: ease-out;
//     }

//     50% {
//         transform: translateY(-50%) translateX(${helixSize / 8}vmin) scale(1);
//         animation-timing-function: ease-in;
//     }

//     75% {
//         transform: translateY(-50%) translateX(${helixSize / 16}vmin) scale(0.8);
//         animation-timing-function: ease-out;
//     }

//     100% {
//         transform: translateY(-50%) translateX(0) scale(1);
//     }
// }


// @keyframes update-z-index {
//     0% {
//         z-index: 1;
//     }

//     49% {
//         z-index: 1;
//     }

//     50% {
//         z-index: -1;
//     }

//     100% {
//         z-index: -1;
//     }
// }
// `;

export { Background };