import {
    boardView,
    balanceManager,
    reactCellsManager,
    reactBalanceManager,
    reactPropertyManager,
    propertyManager,
    playersManager, reactPlayersManager, reactGameHistoryManager, gameHistoryManager
} from "./viewGlobals";
import {useEffect, useState} from "react";

export function useCells() {
    const [cells, setCells] = useState(boardView.cells);
    useEffect(() => {
        reactCellsManager.onSetCells(setCells);
        return () => reactCellsManager.unSetCells(setCells);
    }, []);
    return cells;
}


export function useBalance() {
    const [balance, setBalance] = useState(balanceManager.getBalance());
    useEffect(() => {
        reactBalanceManager.onSetBalance(setBalance);
        return () => reactBalanceManager.unSetBalance(setBalance);
    }, []);
    return balance;
}


export function useProperty() {
    const [property, setProperty] = useState(propertyManager.getProperties());
    useEffect(() => {
        reactPropertyManager.onSetProperty(setProperty);
        return () => reactPropertyManager.unSetProperty(setProperty);
    }, []);
    return property;
}

export function usePlayers() {
    const [players, setPlayers] = useState(playersManager.getPlayers());
    useEffect(() => {
        reactPlayersManager.onSetPlayers(setPlayers);
        return () => reactPlayersManager.unSetPlayers(setPlayers);
    }, []);
    return players;
}

export function useHistory() {
    const [history, setHistory] = useState(gameHistoryManager.getHistory());
    useEffect(() => {
        reactGameHistoryManager.onSetGameHistory(setHistory);
        return () => reactGameHistoryManager.unSetGameHistory(setHistory);
    }, []);
    return history;
}