import React from 'react'
import SearchBar from './dataTables/SearchBar'
import FlexContainer from './dataTables/FlexContainer';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router';

export const DataTableTopSection = ({ resourceName, extraButtonText, extraButtonHandler, disableExtraButton, createRoute, handleSearch }) => {
    const navigate = useNavigate();

    return (
        <FlexContainer>
            <SearchBar placeholder={`Search ${resourceName}`} onSearch={handleSearch} />

            <div>
                {
                    extraButtonText &&
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={disableExtraButton}
                        style={{ marginTop: '10px', marginRight: '20px' }}
                        onClick={extraButtonHandler}
                    >
                        {extraButtonText}
                    </Button>
                }

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    style={{ marginTop: '10px' }}
                    onClick={() => {
                        navigate(createRoute);
                    }}
                >
                    {`Create ${resourceName}`}
                </Button>
            </div>
        </FlexContainer>
    )
}


