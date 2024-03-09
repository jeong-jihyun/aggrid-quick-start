/* eslint-disable react/react-in-jsx-scope */
import { Breadcrumbs, Chip, emphasize, styled } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function StyleBreadcrumbs(props: { label?: string; label2?: string; label3?: string; }) {
    const { label, label2, label3 } = props;

    const StyledBreadcrumb = styled(Chip)(({ theme }) => {
        const backgroundColor = theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
        return {
            backgroundColor,
            height: theme.spacing(3),
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightRegular,
            '&:hover, &:focus': {
                backgroundColor: emphasize(backgroundColor, 0.06),
            },
            '&:active': {
                boxShadow: theme.shadows[1],
                backgroundColor: emphasize(backgroundColor, 0.12),
            },
        };
    }) as typeof Chip;
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb component={'a'} href='#' label='Home' icon={<HomeIcon fontSize="small" />} />
            {label && (<StyledBreadcrumb component="a" href="#" label={label} />)}
            {label2 && (<StyledBreadcrumb component="a" href="#" label={label2} deleteIcon={(< ExpandMoreIcon />)} />)}
            {label3 && (<StyledBreadcrumb component="a" href="#" label={label3} deleteIcon={(< ExpandMoreIcon />)} />)}
        </Breadcrumbs>
    );
}
