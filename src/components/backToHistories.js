import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NextLink from 'next/link';

export const BackToHistories = (props) => {
  return (
    <NextLink
      href="/histories"
      passHref
    >
      <Button
        component="a"
        startIcon={<ArrowBackIcon fontSize="small" />}
      >
        Histories
      </Button>
    </NextLink>
  )
}
