/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Grid, TablePagination, TextField, Typography } from '@mui/material';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { ChangeEvent, useEffect, useState } from 'react';
import React from 'react';
import { StyleBreadcrumbs } from './StyleBreadcrumbs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
// Row Data Interface
interface IRow {
    basDt: string;
    clprBnfRt: string;
    clprPrc: string;
    clprVs: string;
    hiprBnfRt: string;
    hiprPrc: string;
    isinCd: string;
    itmsCtg: string;
    itmsNm: string;
    loprBnfRt: string;
    loprPrc: string;
    mkpBnfRt: string;
    mkpPrc: string;
    mrktCtg: string;
    srtnCd: string;
    trPrc: string;
    trqu: string;
    xpYrCnt: string;
}


// Create new GridExample component
export const GetBondPriceInfo = () => {
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState<IRow[]>([]);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const [totalCount, setTotalCount] = React.useState(0);
    const [beginBasDt, setBeginBasDt] = React.useState<Dayjs | null>(null);
    const [endBasDt, setEndBasDt] = React.useState<Dayjs | null>(null);
    const [likeSrtnCd, setLikeSrtnCdt] = React.useState<string>('');
    const [likeIsinCd, setLikeIsinCd] = React.useState<string>('');
    const [likeItmsNm, setLikeItmsNm] = React.useState<string>('');
    const [mrktCtg, setMrktCtg] = React.useState<string>('');

    const [beginClprVs, setBeginClprVs] = React.useState<number>(0);
    const [endClprVs, setEndClprVs] = React.useState<number>(0);

    const [beginClprBnfRt, setBeginClprBnfRt] = React.useState<number>(0);
    const [endClprBnfRt, setEndClprBnfRt] = React.useState<number>(0);

    const [beginMkpBnfRt, setBeginMkpBnfRt] = React.useState<number>(0);
    const [endMkpBnfRt, setEndMkpBnfRt] = React.useState<number>(0);

    const [beginTrqu, setBeginTrqu] = React.useState<number>(0);
    const [endTrqu, setEndTrqu] = React.useState<number>(0);

    const [beginTrPrc, setBeginTrPrc] = React.useState<number>(0);
    const [endTrPrc, setEndTrPrc] = React.useState<number>(0);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = useState<ColDef[]>([
        { field: 'basDt', headerName: '기준일자' },
        { field: 'clprBnfRt', headerName: '종가 수익률' },
        { field: 'clprPrc', headerName: '종가 가격' },
        { field: 'clprVs', headerName: '종가 대비' },
        { field: 'hiprBnfRt', headerName: '고가 수익률' },
        { field: 'hiprPrc', headerName: '고가 가격' },
        { field: 'isinCd', headerName: 'ISIN코드' },
        { field: 'itmsCtg', headerName: '종목구분' },
        { field: 'itmsNm', headerName: '종목명' },
        { field: 'loprBnfRt', headerName: '저가 수익률' },
        { field: 'loprPrc', headerName: '저가 가격' },
        { field: 'mkpBnfRt', headerName: '시가 수익률' },
        { field: 'mkpPrc', headerName: '시가 가격' },
        { field: 'mrktCtg', headerName: '시장 구분' },
        { field: 'srtnCd', headerName: '단축 코드' },
        { field: 'trPrc', headerName: '거래 대금' },
        { field: 'trqu', headerName: '거래량' },
        { field: 'xpYrCnt', headerName: '만기년수' },
    ]);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(page);
        fetchData();
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
        event?.preventDefault();
        setPage(value);
    };
    const fetchData = async () => {
        const serviceKey = import.meta.env.VITE_API_KEY;
        const resultType = 'json';
        const numOfRows = rowsPerPage;
        const pageNo = page;

        const strbasDt = beginBasDt?.format('YYYYMMDD');
        const strEndBasDt = endBasDt?.format('YYYYMMDD')
        let parameter = '';

        if (typeof strbasDt !== 'undefined') {
            parameter += `&beginBasDt=${beginBasDt}`
        }

        if (typeof strEndBasDt !== 'undefined') {
            parameter += `&endBasDt=${strEndBasDt}`
        }

        if (String(likeSrtnCd).length > 0) {
            parameter += `&likeSrtnCd=${likeSrtnCd}`
        }
        if (String(likeIsinCd).length > 0) {
            parameter += `&likeIsinCd=${likeIsinCd}`
        }
        if (String(likeItmsNm).length > 0) {
            parameter += `&likeItmsNm=${likeItmsNm}`
        }
        if (String(mrktCtg).length > 0) {
            parameter += `&mrktCtg=${mrktCtg}`
        }
        if (beginClprVs > 0) {
            parameter += `&beginClprVs=${beginClprVs}`
        }
        if (endClprVs > 0) {
            parameter += `&endClprVs=${endClprVs}`
        }
        if (beginClprBnfRt > 0) {
            parameter += `&beginClprBnfRt=${beginClprBnfRt}`
        }
        if (endClprBnfRt > 0) {
            parameter += `&endClprBnfRt=${endClprBnfRt}`
        }
        if (beginMkpBnfRt > 0) {
            parameter += `&beginMkpBnfRt=${beginMkpBnfRt}`
        }
        if (endMkpBnfRt > 0) {
            parameter += `&endMkpBnfRt=${endMkpBnfRt}`
        }
        if (beginTrqu > 0) {
            parameter += `&beginTrqu=${beginTrqu}`
        }
        if (endTrqu > 0) {
            parameter += `&endTrqu=${endTrqu}`
        }
        if (beginTrPrc > 0) {
            parameter += `&beginTrPrc=${beginTrPrc}`
        }
        if (endTrPrc > 0) {
            parameter += `&endTrPrc=${endTrPrc}`
        }
        const url = `https://apis.data.go.kr/1160100/service/GetBondSecuritiesInfoService/getBondPriceInfo?serviceKey=${serviceKey}&resultType=${resultType}&numOfRows=${numOfRows}&pageNo=${pageNo}${parameter}`;

        const response = await fetch(url);
        const data = await response.json();
        setTotalCount(data.response.body.totalCount);
        setRowData(data.response.body.items.item);
    }
    // https://apis.data.go.kr/1160100/service/GetBondSecuritiesInfoService/getBondPriceInfo?serviceKey=3NKSD4pMiU1dAnSi9YfhhEcZyp1uL2gFUk8wq7Iy3Nex4lGzhRXbYlaKnxUDb2P5IxztSaDkmL14JHAbRONlDw%3D%3D&resultType=json
    // Fetch data & update rowData state
    useEffect(() => {
        fetchData();
    }, [page, rowsPerPage]);
    // 기준일자
    function handleBeginBasDt(value: Dayjs | null): void {
        setBeginBasDt(value);
    }
    // 기준일자
    function handleEndBasDt(value: Dayjs | null): void {
        setEndBasDt(value);
    }
    // 단축코드
    function handlelikeSrtnCd(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setLikeSrtnCdt(event.currentTarget.value);
    }
    // ISIN코드
    function handlelikeIsinCd(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setLikeIsinCd(event.currentTarget.value);
    }
    // 종목명
    function handleLikeItmsNm(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setLikeItmsNm(event.currentTarget.value);
    }
    // 시장구분
    function handleMrktCtg(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setMrktCtg(event.currentTarget.value);
    }
    // 종가_대비
    function handleBeginClprVs(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setBeginClprVs(Number(event.currentTarget.value));
    }
    function handleEndClprVs(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setEndClprVs(Number(event.currentTarget.value));
    }
    // 종가_수익률
    function handleBeginClprBnfRt(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setBeginClprBnfRt(Number(event.currentTarget.value));
    }
    function handleEndClprBnfRt(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setEndClprBnfRt(Number(event.currentTarget.value));
    }
    // 시가_수익률
    function handleBeginMkpBnfRt(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setBeginMkpBnfRt(Number(event.currentTarget.value));
    }
    function handleEndMkpBnfRt(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setEndMkpBnfRt(Number(event.currentTarget.value));
    }
    // 거래량
    function handleBeginTrqu(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setBeginTrqu(Number(event.currentTarget.value));
    }
    function handleEndTrqu(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setEndTrqu(Number(event.currentTarget.value));
    }
    // 거래대금
    function handleBeginTrPrc(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setBeginTrPrc(Number(event.currentTarget.value));
    }
    function handleEndTrPrc(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setEndTrPrc(Number(event.currentTarget.value));
    }
    return (
        <Container fixed>
            <StyleBreadcrumbs label='금융위원회' label2='채권시세정보' />

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: 2 }}>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>채권시세정보</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            한국거래소에서 제공하는 채권시세 정보국채전문유통시장, 일반채권시장, 소액채권시장의 시세 정보를 채권시세에 대한 오퍼레이션을 제공한다.
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', width: '100%' }}>
                                        <DatePicker orientation="landscape" format='YYYY-MM-DD' label='기준일자-시작일' views={["year", "month", "day"]} defaultValue={dayjs(new Date().setFullYear(new Date().getFullYear() - 2))} onChange={handleBeginBasDt} />
                                        <Typography component={'span'} sx={{ display: 'flex', alignItems: 'center', mr: 1, ml: 1 }}>~</Typography>
                                        <DatePicker format='YYYY-MM-DD' label='기준일자-종료일' views={["year", "month", "day"]} defaultValue={dayjs(new Date())} onChange={handleEndBasDt} />
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField value={likeSrtnCd} onChange={handlelikeSrtnCd} label='단축코드' placeholder='C01501D86' sx={{ width: '100%' }}></TextField>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField value={likeIsinCd} onChange={handlelikeIsinCd} label='ISIN코드' placeholder='KR101501D868' sx={{ width: '100%' }}></TextField>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField value={likeItmsNm} onChange={handleLikeItmsNm} label='종목명' placeholder='국민주택1종18-06' sx={{ width: '100%' }}></TextField>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField value={mrktCtg} onChange={handleMrktCtg} label='시장구분' placeholder='일반채권' sx={{ width: '100%' }}></TextField>
                                </Grid>
                                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                                    <TextField value={beginClprVs} onChange={handleBeginClprVs} label='종가_대비' placeholder='0'></TextField>
                                    <Typography component={'span'} sx={{ display: 'flex', alignItems: 'center', mr: 1, ml: 1 }}>~</Typography>
                                    <TextField value={endClprVs} onChange={handleEndClprVs} label='종가_대비' placeholder='0'></TextField>
                                </Grid>
                                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                                    <TextField value={beginClprBnfRt} onChange={handleBeginClprBnfRt} label='종가_수익률' placeholder='0'></TextField>
                                    <Typography component={'span'} sx={{ display: 'flex', alignItems: 'center', mr: 1, ml: 1 }}>~</Typography>
                                    <TextField value={endClprBnfRt} onChange={handleEndClprBnfRt} label='종가_수익률' placeholder='0'></TextField>
                                </Grid>
                                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                                    <TextField value={beginMkpBnfRt} onChange={handleBeginMkpBnfRt} label='시가_수익률' placeholder='0'></TextField>
                                    <Typography component={'span'} sx={{ display: 'flex', alignItems: 'center', mr: 1, ml: 1 }}>~</Typography>
                                    <TextField value={endMkpBnfRt} onChange={handleEndMkpBnfRt} label='시가_수익률' placeholder='0'></TextField>
                                </Grid>
                                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                                    <TextField value={beginTrqu} onChange={handleBeginTrqu} label='거래량' placeholder='0'></TextField>
                                    <Typography component={'span'} sx={{ display: 'flex', alignItems: 'center', mr: 1, ml: 1 }}>~</Typography>
                                    <TextField value={endTrqu} onChange={handleEndTrqu} label='거래량' placeholder='0'></TextField>
                                </Grid>
                                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                                    <TextField value={beginTrPrc} onChange={handleBeginTrPrc} label='거래대금' placeholder='0'></TextField>
                                    <Typography component={'span'} sx={{ display: 'flex', alignItems: 'center', mr: 1, ml: 1 }}>~</Typography>
                                    <TextField value={endTrPrc} onChange={handleEndTrPrc} label='거래대금' placeholder='0'></TextField>
                                </Grid>
                            </Grid>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                <Button variant='contained' color='info' onClick={fetchData}>조회</Button>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', mt: 2 }}>
                <div className={"ag-theme-quartz"} style={{ width: '100%', height: '500px' }}>
                    {/* The AG Grid component, with Row Data & Column Definition props */}
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                    />
                </div>
                <TablePagination count={Math.ceil(totalCount / rowsPerPage)} page={page} component="div" onPageChange={handleChangePage} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} />
            </Box>
        </Container >);
}

