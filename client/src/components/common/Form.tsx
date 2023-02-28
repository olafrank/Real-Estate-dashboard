import {
  Box, Typography, FormControl, FormHelperText,
  TextField, TextareaAutosize, Stack, MenuItem, Button, Select
} from "@pankod/refine-mui";

import { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";

const Form = ({ type, register, onFinish, formLoading, handleImageChange, handleSubmit, onFinishHandler, propertyImage}: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142d'>{type} a property</Typography>
      <Box mt={2.5} borderRadius='15px' padding='20px' bgcolor='#fcfcfc'>
        <form style={{
          marginTop: '20px',
          width: '100%', display: 'flex',
          flexDirection: 'column', gap: '20px'
        }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText sx={{
              fontWeight: 500, margin: '10px 0',
              fontSize: 16, color: '#11142d'
            }}>Enter Property Name</FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register('title', { required: true })} />
          </FormControl>
          <FormControl>
            <FormHelperText sx={{
              fontWeight: 500, margin: '15px 0',
              fontSize: 16, color: '#11142d'
            }}>Enter Description</FormHelperText>
            <TextareaAutosize minRows={5} required
              placeholder="write Description"
              color="info"
              style={{
                width: '100%', background: 'transparent', fontSize: '16px',
                borderColor: 'rgba(0,0,0,0.23)', borderRadius: 6, padding: 10, color: '#919191'
              }}
              {...register('description', { required: true })} />

          </FormControl>
          <Stack direction='row' gap={4}>
            <FormControl sx={{ flex: 1 }} >
              <FormHelperText sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142d'
              }}>Select Property Type
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ 'aria-label': 'without label' }}
                defaultValue='apartment'
                {...register('propertyType', { required: true })}
              >
                <MenuItem value='apartment'>Apartment</MenuItem>
                <MenuItem value='land'>Land</MenuItem>
                <MenuItem value='villa'>Villa</MenuItem>
                <MenuItem value='bungalow'>Bungalow</MenuItem>
                <MenuItem value='office space'>Office Space</MenuItem>
                <MenuItem value='duplex'>Duplex</MenuItem>
                <MenuItem value='condos'>Condos</MenuItem>
                <MenuItem value='chalet'>Chalet</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText sx={{
                fontWeight: 500, margin: '10px 0',
                fontSize: 16, color: '#11142d'
              }}>Enter Property Price</FormHelperText>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                color="info"
                type='number'
                variant="outlined"
                {...register('price', { required: true })} />
            </FormControl>

          </Stack>
          <FormControl>
            <FormHelperText sx={{
              fontWeight: 500, margin: '10px 0',
              fontSize: 16, color: '#11142d'
            }}>Enter Location</FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register('location', { required: true })} />
          </FormControl>
          <Stack direction='column' gap={1} justifyContent='center' mb={2}>
            <Stack direction='row' gap={2}>
              <Typography color="#11142d" fontSize={16}
                fontWeight={500} my="10px">Property Photo</Typography>
              <Button component='label' sx={{
                width: 'fit-content', color: '#2ed480',
                textTransform: 'capitalize', fontSize: 16
              }}>Upload *</Button>
              <input  accept="image/*" type='file'
                onChange={(e) => {
                  // @ts-ignore
                  handleImageChange(e.target.files[0])
                }} />
            </Stack>
            <Typography fontSize={14} color='#808191' sx={{
              wordBreak: 'break-all'
            }}>{propertyImage?.name}</Typography>
          </Stack>
          <CustomButton type="submit" title={formLoading? 'submitting...' : 'Submit'}
          backgroundColor="#475be8"
          color="#fcfcfc" />

        </form>
      </Box>
    </Box>
  )
}

export default Form