import { memo, useMemo } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { formatEther } from 'ethers/lib/utils'

import { useContracts } from 'contexts/contract-context'
import ContainedButton from 'components/UI/Buttons/ContainedButton'
import CardWrapper from '../CardWrapper'
import { formatNumber } from 'utils/helpers/format'

const SnowClaim = () => {
  const {
    claim,
    userClaimable,
    distributionStatus
  } = useContracts();

  const claimable = useMemo(() =>
    userClaimable ? parseFloat(formatEther(userClaimable)) : null
    , [userClaimable]);

  return (
    <CardWrapper title='Claim'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography color='textSecondary' variant='body1'>
            {`Current distribution amount: ${formatNumber(distributionStatus?.snobDistributed,0)} SNOB`}
          </Typography>
          <Typography color='textSecondary' variant='body1'>
            {`Current distribution:  ${(new Date(distributionStatus?.startDate)).toDateString()}`}
          </Typography>
          <br/>
          <Typography color='textSecondary' variant='body1'>
            {`Next distribution: ${(new Date(distributionStatus?.nextDate)).toDateString()}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ContainedButton
            fullWidth
            disabled={!claimable}
            onClick={claim}
          >
            {`Claim ${formatNumber(claimable, 3)} Snowballs`}
          </ContainedButton>
        </Grid>
      </Grid>
    </CardWrapper>
  )
}

export default memo(SnowClaim)
