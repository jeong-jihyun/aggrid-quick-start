/* eslint-disable react/react-in-jsx-scope */
import { Typography } from '@mui/material';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { CustomCellRendererProps, AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useState } from 'react';
//import { createRoot } from 'react-dom/client';

const CompanyLogoRenderer = (params: CustomCellRendererProps) => (
    <Typography component={'span'}
        variant='body1'
        sx={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center' }}>
        {params.value && (
            <Typography component={'img'} alt={`${params.value} Flag`} src={`https://www.ag-grid.com/example-assets/space-company-logos/${params.value.toLowerCase()}.png`} sx={{ display: 'flex', width: '25px', height: 'auto', maxHeight: '50%', marginRight: '12px', filter: 'brightness(1,1)' }} />
        )}
        <Typography component={'p'} sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{params.value}</Typography>
    </Typography>
)

const MissionResultRenderer = (params: CustomCellRendererProps) => (
    <Typography component={'div'}
        variant='body1' sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '100%', alignItems: 'center', alignContent: 'center' }}>
        <Typography component={'img'} alt={`${params.value}`} src={`https://www.ag-grid.com/example-assets/icons/${params.value ? 'tick-in-circle' : 'cross-in-circle'}.png`} sx={{ width: '15px', height: '15px' }} />
    </Typography>
)

const dateFormatter = (params: ValueFormatterParams): string => {
    return new Date(params.value).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

interface IRow {
    mission: string;
    company: string;
    location: string;
    date: string;
    time: string;
    rocket: string;
    price: number;
    successful: boolean;
}

const CreateaBasicGrid = () => {
    const [rowData, setRowData] = useState<IRow[]>([]);
    const [colDefs] = useState<ColDef[]>([
        {
            field: 'mission',
            width: 150,
            checkboxSelection: true,
        },
        {
            field: 'company',
            width: 130,
            cellRenderer: CompanyLogoRenderer,
        },
        {
            field: 'location',
            width: 225,
        },
        {
            field: 'date',
            valueFormatter: dateFormatter,
        },
        {
            field: 'price',
            width: 130,
            valueFormatter: (params: ValueFormatterParams) => {
                return '£' + params.value.toLocaleString();
            },
        },
        {
            field: 'successful',
            width: 120,
            cellRenderer: MissionResultRenderer,
        },
        { field: 'rocket' },
    ]);

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/space-mission-data.json')
            .then((result) => result.json())
            .then((rowData) => setRowData(rowData));
    }, []);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            filter: true,
            editable: true,
        };
    }, []);

    return (
        <div
            className={
                "ag-theme-quartz"
            }
            style={{ width: '100%', height: '600px' }}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                rowSelection="multiple"
                onSelectionChanged={(e) => console.log(e.context)}
                onCellValueChanged={(e) =>
                    console.log(`New Cell Value: ${e.value}`)
                }
            />
        </div>
    )
}

export default CreateaBasicGrid
