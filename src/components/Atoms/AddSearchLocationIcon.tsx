import styled from 'styled-components'
import MapIcon from '@mui/icons-material/Map';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const Body = styled.div`
    width: 30px;
    height: 30px;
    position: relative;
`

const ZoomIconWrapper = styled.div`
    position: absolute;
    z-index:10;
    background-color: #e6e7ee;
    border-radius: 100px;
    width: 14px;
    height: 14px;
    top: 14px;
    left: 15px;
`

const MapSx = {
    fontSize: "30px",
    position: "absolute",
    "z-index": "5"
}

const ZoomSx = {
    fontSize: "18px",
    position: "relative"
}

const AddSearchLocationIcon = () => {

    return (
        <Body>
            <MapIcon sx={MapSx} />
            <ZoomIconWrapper>
                <ZoomInIcon sx={ZoomSx} />
            </ZoomIconWrapper>
        </Body>
    )
}



export default AddSearchLocationIcon;