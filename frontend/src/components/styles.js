import {
    TableCell,
    TableRow,
    styled,
    tableCellClasses,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
    Box,
    Card,
    Typography,
    Container,
    alpha,
} from "@mui/material";

const drawerWidth = 260;

// Modern color palette
export const colors = {
    primary: '#4361ee',
    secondary: '#3f37c9',
    accent: '#f72585',
    success: '#2a9d8f',
    danger: '#e63946',
    warning: '#f8961e',
    info: '#4cc9f0',
    dark: '#212529',
    light: '#f8f9fa',
    gray: '#6c757d',
    grayLight: '#dee2e6',
    white: '#ffffff',
};

// Table styling
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: colors.dark,
        color: colors.white,
        fontSize: 16,
        fontWeight: 600,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: alpha(colors.grayLight, 0.1),
    },
    '&:hover': {
        backgroundColor: alpha(colors.primary, 0.05),
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    transition: 'all 0.2s ease',
}));

// Layout components
export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
    backgroundColor: colors.white,
    color: colors.dark,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
            backgroundColor: colors.white,
            borderRight: `1px solid ${colors.grayLight}`,
            color: colors.dark,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// Card components
export const DashboardCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    },
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: colors.dark,
}));

export const CardContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
}));

// Page container
export const PageContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));

// Section divider
export const SectionDivider = styled(Box)(({ theme }) => ({
    borderBottom: `1px solid ${colors.grayLight}`,
    margin: `${theme.spacing(3)} 0`,
    width: '100%',
}));

// Dashboard stat box
export const StatBox = styled(Box)(({ theme, bgColor = colors.primary }) => ({
    backgroundColor: bgColor,
    color: colors.white,
    padding: theme.spacing(2),
    borderRadius: '8px',
    height: '100%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const StatValue = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 700,
}));

export const StatLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    opacity: 0.9,
}));