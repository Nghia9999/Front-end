import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAssetsByDepartmentQuery } from 'state/api';
import {
  Container,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

function ProductDetails() {
    const { id } = useParams();
    const { data, isSuccess, isError, isLoading } = useGetAssetsByDepartmentQuery(id);

    if (isLoading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (isError) {
        return (
            <Container>
                <Typography variant="h6" color="error">Error loading product details</Typography>
            </Container>
        );
    }

    if (isSuccess && data && Array.isArray(data)) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>Product Details</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Asset Type</TableCell>
                                <TableCell>Date of Use</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Device Code</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Specification</TableCell>
                                <TableCell>Wear Rate</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((asset) => (
                                <TableRow key={asset._id}>
                                    <TableCell>{asset._id}</TableCell>
                                    <TableCell>{asset.assettype?.name}</TableCell>
                                    <TableCell>{asset.dateuse}</TableCell>
                                    <TableCell>{asset.department?.name}</TableCell>
                                    <TableCell>{asset.description || 'N/A'}</TableCell>
                                    <TableCell>{asset.devicecode}</TableCell>
                                    <TableCell>{asset.name}</TableCell>
                                    <TableCell>{asset.price}</TableCell>
                                    <TableCell>{asset.quantity}</TableCell>
                                    <TableCell>{asset.specification || 'N/A'}</TableCell>
                                    <TableCell>{asset.wearrate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        );
    }

    return null;
}

export default ProductDetails;
