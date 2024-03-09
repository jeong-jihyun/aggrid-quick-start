/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { StyleBreadcrumbs } from './StyleBreadcrumbs'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, useState } from 'react';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';

const GetDomeBankGeneInfo = () => {
    const [basYm, setBasYm] = useState<Dayjs | null>(null);
    const [title, setTitle] = React.useState<string>('');
    const [isLodding, setIsLodding] = React.useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const [subData, setSubData] = useState<any[]>([]);

    const handlebasYm = (value: Dayjs | null) => {
        setBasYm(value);
    }

    const handleTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setTitle(event.currentTarget.value);
    }

    const fetchData = async () => {
        setIsLodding(true);
        const serviceKey = import.meta.env.VITE_API_KEY;
        const resultType = 'json';

        const numOfRows = 100000;
        const pageNo = 1;
        let parameter = '';

        if (typeof basYm !== 'undefined' && basYm !== null) {
            parameter += `&basYm=${basYm?.format('YYYYMM')}`
        }
        if (String(title).length > 0) {
            parameter += `&title=${title}`
        }
        const url = `https://apis.data.go.kr/1160100/service/GetDomeBankInfoService/getDomeBankGeneInfo?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}&resultType=${resultType}${parameter}`;

        const response = await fetch(url);
        const res = await response.json();

        setData(res.response.body.tableList);

        setIsLodding(false);
    }
    return (
        <Container fixed>

            <StyleBreadcrumbs label='금융위원회' label2='금융통계국내은행정보' label3='국내은행일반현황조회' />

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: 2 }}>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>국내은행일반현황조회</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            기준년월, 타이틀을 통하여 금융회사명, 임직원수 , 임직원구분코드명등 국내은행 일반현황정보를 조회하는 국내은행일반현황조회 기능
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', width: '100%' }}>
                                        <DatePicker orientation="landscape" format='YYYY-MM' label='기준일자-시작일' views={["year", "month"]} defaultValue={dayjs(new Date())} onChange={handlebasYm} value={basYm} />
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField value={title} onChange={handleTitle} label='국내은행 일반현황' placeholder='국내은행 일반현황' sx={{ width: '100%' }}></TextField>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <Button variant='contained' color='info' onClick={fetchData}>조회</Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                {isLodding && (<Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', position: 'absolute', top: '50%', left: '50%' }}><CircularProgress /></Box>)}
                <Box sx={{
                    display: 'flex', flexDirection: 'row', gap: 2
                }}>
                    <TableContainer component={Paper} sx={{ width: '30%' }} >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableCell align="center">Title</TableCell>
                            </TableHead>
                            <TableBody>
                                {data.map((v, idx: number) => (
                                    <TableRow
                                        key={idx}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell onClick={() => {
                                            console.log(v.items.item)
                                            setSubData(v.items.item)
                                        }}>
                                            {v.title}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer component={Paper} sx={{ width: '70%' }} >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableCell align="center">basYm</TableCell>
                                <TableCell align="center">crno</TableCell>
                                <TableCell align="center">fncoCd</TableCell>
                                <TableCell align="center">fncoNm</TableCell>
                                <TableCell align="center">xcsmCnt</TableCell>
                                <TableCell align="center">xcsmDcd</TableCell>
                                <TableCell align="center">xcsmDcdNm</TableCell>
                            </TableHead>
                            <TableBody>
                                {subData.slice(0, 10).map((v, idx: number) => (
                                    <TableRow
                                        key={idx}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{v.basYm}</TableCell>
                                        <TableCell align="center">{v.crno}</TableCell>
                                        <TableCell align="center">{v.fncoCd}</TableCell>
                                        <TableCell align="center">{v.fncoNm}</TableCell>
                                        <TableCell align="center">{v.xcsmCnt}</TableCell>
                                        <TableCell align="center">{v.xcsmDcd}</TableCell>
                                        <TableCell align="center">{v.xcsmDcdNm}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Container >
    )
}

export default GetDomeBankGeneInfo
