import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Divider,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import FlightDetailModal from '../Components/FlightDetailModal/FlightDetailModal';
import FlightCard from '../Components/FlightCard/FlightCard';
import { request } from '../services/request';
import { getFlights } from '../services/api';
import useStyles from './styles';

export default function Home() {
  const { progress, divider, wrapper } = useStyles();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [modalData, setModalData] = useState(null);

  /**
   * Call flights list on every update
   */
  const onReload = () => {
    setReload(prevState => !prevState);
  };

  /**
   * Get flight list on page load and on reload change state
   */
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await request.get(getFlights()).then(res => res);
      if (response?.ok) {
        setData(response.data);
        setLoading(false);
      } else {
        setError(true);
      }
    })();
    }, [reload]); // eslint-disable-line

  /**
   * Show flight modal and its details
   * @param flightData
   */
  const onShow = flightData => {
    setShowModal(true);
    setModalData(flightData);
  };

  return (
    <Container maxWidth="md" className={wrapper}>
      <Box mt={1} mb={1}>
        <Typography color="textPrimary" variant="h5">
          Flights List
        </Typography>
      </Box>
      <Divider className={divider} />
      {loading && <CircularProgress className={progress} disableShrink />}
      {data?.map(item => (
        <FlightCard
          /* eslint-disable-next-line no-underscore-dangle */
          key={item._id}
          flight={item}
          showModal={() => onShow(item)}
          onUpdateData={onReload}
        />
      ))}
      {error && (
        <Box m={2}>
          <Alert severity="error">500 - Internal server error!</Alert>
        </Box>
      )}
      <FlightDetailModal
        onUpdateData={onReload}
        visible={showModal}
        handleCancel={() => setShowModal(false)}
        flight={modalData}
      />
    </Container>
  );
}
