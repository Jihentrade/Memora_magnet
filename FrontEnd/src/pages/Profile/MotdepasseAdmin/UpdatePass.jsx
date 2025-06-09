import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material'
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout'
import AvatarMotpasse from './AvatarMotpasse'
import Motdepasse from './Motdepasse'

const Profile = () => (
  <>
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        py: 8,
        marginTop: '-50px',
        marginRight: '100px',
      }}
    >
      <Container maxWidth='lg'>
        <Stack spacing={3}>
          <div>
            <Typography variant='h5'>Mot de passe</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={4}>
                <AvatarMotpasse />
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <Motdepasse />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
)

// Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Profile
