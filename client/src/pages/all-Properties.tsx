import { Add } from '@mui/icons-material';
import { useTable } from '@pankod/refine-core';
import { Box, Typography, Stack, TextField, Select, MenuItem } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';

import { PropertyCard, CustomButton } from 'components';

import { useMemo } from 'react';


const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter, setSorter,
    filters, setFilters
  } = useTable();

  const allProperties = data?.data ?? [];

  const currentPrice = sorter.find((item) => item.field === 'price')?.order

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }])
  }

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      ('field' in item ? item : []));

    return {
      title: logicalFilters.find((item) => item.field === 'title')?.value || '',
      propertyType: logicalFilters.find((item) => item.field === 'propertyType')?.value || '',
    }

  }, [filters])

  if (isLoading) return <Typography sx={{fontSize:25, fontWeight:700, color:'#11142d'}}>Loading</Typography>
  if (isError) return <Typography sx={{fontSize:25, fontWeight:700, color:'#11142d'}}>Error</Typography>

  return (

    <Box>
      <Box mt='20px' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Stack direction='column' width='100%'>
          <Typography fontSize={25} fontWeight={700} color='#11142d'>{!allProperties.length ? 'There is no property' :
            'All properties'}</Typography>
          <Box mb={2} mt={3} display='flex' width='84%' justifyContent='space-between' flexWrap='wrap'>
            <Box display='flex' gap={2} flexWrap='wrap'
              mb={{ xs: '20px', sm: 0 }}>
              <CustomButton
                title={`Sort Price ${currentPrice === 'asc' ? '↑' : '↓'}`}
                handleClick={() => toggleSort('price')}
                backgroundColor='#475be8'
                color='#fcfcfc' />
              <TextField
                variant='outlined'
                color='info' placeholder='Search by title'
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: 'title',
                      operator: 'contains',
                      value: e.currentTarget.value ? e.currentTarget.value : undefined
                    }
                  ])
                }} />
              <Select variant='outlined'
                color='info'
                displayEmpty
                required
                inputProps={{ 'aria-label': 'without label' }}
                defaultValue=''
                value={currentFilterValues.propertyType}
                onChange={(e) => {
                  setFilters([
                    {
                      field: 'propertyType',
                      operator: 'eq',
                      value: e.target.value
                    }
                  ], 'replace')
                }}><MenuItem value=''>All</MenuItem>
                {['Apartment', 'Land', 'Villa', 'Bungalow', 'Office Space', 'Duplex', 'Condos', 'Chalet']
                  .map((type) => (<MenuItem key={type} value={type.toLocaleLowerCase()}>{type}</MenuItem>))}

              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Stack direction='row' justifyContent='space-between'
        alignItems='center'>

        <CustomButton
          title='Add Property'
          handleClick={() => navigate('/properties/create')}
          backgroundColor='#475be8'
          color='#fcfcfc'
          icon={<Add />} />
      </Stack>
      <Box mt='20px' sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {allProperties.map((property) => (
          <PropertyCard
            key={property._id}
            _id={property._id}
            title={property.title}
            price={property.price}
            location={property.location}
            photo={property.photo} />
        ))}
      </Box>
      {/* pagination code below*/}
      {allProperties.length > 0 && (
        <Box display='flex' gap={2} mt={3} flexWrap='wrap'>
          <CustomButton title='previous' handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor='#475be8' color='#fcfcfc'
            disabled={!(current > 1)} />
          <Box display={{ xs: 'hidden', sm: 'flex' }} alignItems='center' gap='5px'>
            Page{''}<strong>{current} of {pageCount}</strong>
          </Box>
          <CustomButton title='next' handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor='#475be8' color='#fcfcfc'
            disabled={current === pageCount} />
          <Select variant='outlined'
            color='info'
            displayEmpty
            required
            inputProps={{ 'aria-label': 'without label' }}
            defaultValue={10}

            onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}>

            {[10, 20, 30, 50].map((size) => (
              <MenuItem key={size} value={size}>show {size}</MenuItem>
            ))}

          </Select>
        </Box>
      )}
    </Box>
  )
}

export default AllProperties;