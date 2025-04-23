import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Tooltip as RechartsTooltip } from 'recharts';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { colors } from './styles';

// Enhanced color palette
const COLORS = [colors.success, colors.danger];

// Styled components
const ChartContainer = styled(motion.div)(({ theme }) => ({
    width: '100%',
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
}));

const ChartTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: colors.dark,
    textAlign: 'center',
}));

const ChartLegend = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    gap: theme.spacing(3),
}));

const LegendItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const LegendColor = styled(Box)(({ color }) => ({
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: color,
}));

const LegendText = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    color: colors.dark,
}));

const renderActiveShape = (props) => {
    const {
        cx, cy, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value
    } = props;

    return (
        <g>
            <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={colors.dark} style={{ fontWeight: 600 }}>
                {payload.name}
            </text>
            <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill={colors.dark} style={{ fontSize: '1.2rem' }}>
                {`${(percent * 100).toFixed(0)}%`}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 10}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 10}
                outerRadius={outerRadius + 15}
                fill={fill}
            />
        </g>
    );
};

const CustomPieChart = ({ data, title = "Attendance Overview" }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <ChartContainer
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <ChartTitle variant="h6" component={motion.h6} variants={itemVariants}>
                {title}
            </ChartTitle>
            
            <Box sx={{ width: '100%', height: 300 }} component={motion.div} variants={itemVariants}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            fill="#8884d8"
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                            animationBegin={0}
                            animationDuration={1200}
                            animationEasing="ease-out"
                        >
                            {data.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                    stroke="none"
                                />
                            ))}
                        </Pie>
                        <RechartsTooltip 
                            formatter={(value, name) => [`${value}%`, name]}
                            contentStyle={{
                                borderRadius: 8,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                border: 'none',
                                padding: '10px 14px',
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
            
            <ChartLegend component={motion.div} variants={itemVariants}>
                {data.map((entry, index) => (
                    <LegendItem key={`legend-${index}`}>
                        <LegendColor color={COLORS[index % COLORS.length]} />
                        <LegendText>{entry.name}</LegendText>
                    </LegendItem>
                ))}
            </ChartLegend>
        </ChartContainer>
    );
};

export default CustomPieChart;