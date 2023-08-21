import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DataTableTopSection } from './DataTableTopSection';
import FormPagination from './FormPagination';
import RowsPerPageMenu from './dataTables/RowsPerPageMenu'
const DataTable = ({ columns, disableExtraButton, rowsPerPage, data, multiSelect, resourceName, createRoute, loading, handleSearch, extraButtonHandler, extraButtonText, pageCount, currentPage, handlePageChange, handleRowsChange, onSelectionModelChange }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>

            <DataTableTopSection
                extraButtonText={extraButtonText}
                extraButtonHandler={extraButtonHandler}
                disableExtraButton={disableExtraButton}
                resourceName={resourceName}
                createRoute={createRoute}
                handleSearch={handleSearch}
            />
            <RowsPerPageMenu rowsPerPage={rowsPerPage} handleRowsChange={handleRowsChange} />
            <DataGrid
                columns={columns}
                rows={data}
                loading={loading}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[]}
                checkboxSelection={multiSelect === 1}
                onRowSelectionModelChange={onSelectionModelChange}
                autoHeight
                components={{
                    // Hide the default pagination by overriding it with the empty component
                    Pagination: () => { }
                }} style={{ width: '100%', marginTop: '16px' }}
            />

            <FormPagination handlePageChange={handlePageChange} currentPage={currentPage} pageCount={pageCount} />
        </div>
    );
};

export default DataTable;
