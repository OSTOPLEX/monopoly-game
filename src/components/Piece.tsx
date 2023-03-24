import React from 'react';
import {ThreeEvent, useLoader} from "@react-three/fiber";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";
import {boardView} from "../viewGlobals";
import {PieceColor, PieceDomain} from "../boardUtils";
import * as THREE from "three";


const PieceColorsMapping = Object.freeze({
    [PieceColor.Blue]: {
        mtl: import.meta.env.BASE_URL + 'models/chipblue.mtl',
        obj: import.meta.env.BASE_URL + 'models/chipblue.obj'
    },
    [PieceColor.Green]: {
        mtl: import.meta.env.BASE_URL + 'models/chipgreen.mtl',
        obj: import.meta.env.BASE_URL + 'models/chipgreen.obj'
    },
    [PieceColor.Red]: {
        mtl: import.meta.env.BASE_URL + 'models/chipred.mtl',
        obj: import.meta.env.BASE_URL + 'models/chipred.obj'
    },
    [PieceColor.Yellow]: {
        mtl: import.meta.env.BASE_URL + 'models/chipyellow.mtl',
        obj: import.meta.env.BASE_URL + 'models/chipyellow.obj'
    },
    [PieceColor.Pink]: {
        mtl: import.meta.env.BASE_URL + 'models/chippink.mtl',
        obj: import.meta.env.BASE_URL + 'models/chippink.obj'
    },
    [PieceColor.Orange]: {
        mtl: import.meta.env.BASE_URL + 'models/chiporange.mtl',
        obj: import.meta.env.BASE_URL + 'models/chiporange.obj'
    },
    [PieceColor.White]: {
        mtl: import.meta.env.BASE_URL + 'models/chipwhite.mtl',
        obj: import.meta.env.BASE_URL + 'models/chipwhite.obj'
    },
    [PieceColor.LightBlue]: {
        mtl: import.meta.env.BASE_URL + 'models/chiplightblue.mtl',
        obj: import.meta.env.BASE_URL + 'models/chiplightblue.obj'
    }
})


export type PieceProps = {
    cellIndex: number,
    pieceDomain: PieceDomain,
}

export function Piece(props: PieceProps) {
    const mtl = useLoader(MTLLoader, PieceColorsMapping[props.pieceDomain.color].mtl);
    const obj = useLoader(OBJLoader, PieceColorsMapping[props.pieceDomain.color].obj, (loader) => {
        mtl.preload();
        loader.setMaterials(mtl);
    });
    const new_obj = obj.clone();
    props.pieceDomain.object3D = new_obj;
    return (
        <primitive object={new_obj} position={boardView.getCell(props.cellIndex).getCenter3()}
            scale={[1, 1, 1]}/>
    )
}