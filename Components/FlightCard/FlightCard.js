import React, { useState } from 'react';
import { object, func } from 'prop-types';
import clsx from 'clsx';
import { MdFlightLand, MdFlightTakeoff } from 'react-icons/md';
import { HiArrowNarrowRight } from 'react-icons/Hi';
import { FiTrash } from 'react-icons/Fi';
import { RiMessage3Line } from 'react-icons/Ri';
import { Button, Grid, Paper, Typography, Chip } from '@material-ui/core';
import useStyles from './styles';
import { request } from '../../services/request';
import { deleteFlight } from '../../services/api';
import formatTime from '../../utiles';
import AlertMessage from '../AlertMessage/AlertMessage';

const FlightCard = ({ flight, showModal, onUpdateData }) => {
  const {
    paper,
    flightIcon,
    deleteBtn,
    info,
    boldText,
    greenStatus,
    yellowStatus,
    status,
    btnContainer,
    button,
    arrowIcon,
    deleteIcon,
    delayTime,
  } = useStyles();
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  /**
   * Delete flight
   * @returns {Promise<void>}
   */
  const deleteSelectedFlight = async () => {
    const response = await request
      // eslint-disable-next-line no-underscore-dangle
      .delete(deleteFlight(flight?._id))
      .then(res => res);
    if (response?.ok) {
      setShowMessage(true);
      setMessage(response?.data?.message);
      onUpdateData();
    }
  };

  return (
    <Paper className={paper}>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={3}>
          <Typography className={boldText} gutterBottom>
            <MdFlightLand className={flightIcon} />{' '}
            {formatTime(flight?.scheduledArrival)}
          </Typography>
          <Typography className={boldText} gutterBottom>
            <MdFlightTakeoff className={flightIcon} />{' '}
            {flight?.delayTime ? (
              <>
                <small className={delayTime}>
                  {formatTime(flight?.scheduledDeparture)}
                </small>{' '}
                {formatTime(flight?.delayTime)}
              </>
            ) : (
              formatTime(flight?.scheduledDeparture)
            )}
          </Typography>
        </Grid>
        <Grid item xs={2} className={info}>
          <Typography gutterBottom className={boldText}>
            {flight?.sourcePortName} <small>{flight?.sourcePortCode}</small>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {flight?.flightCode} {flight?.flightProvider}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Chip
            className={clsx(
              status,
              flight?.status === 'DELAYED' ? yellowStatus : greenStatus,
            )}
            size="small"
            label={flight?.status}
          />
        </Grid>
        <Grid item xs={2} className={info}>
          <Typography className={boldText}>
            {flight?.destinationPortName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {flight?.destinationPortCode}
          </Typography>
        </Grid>
        <Grid item xs={3} container justify="flex-end" className={btnContainer}>
          <Button
            className={clsx(button, deleteBtn)}
            startIcon={<FiTrash className={deleteIcon} />}
            onClick={deleteSelectedFlight}
          >
            Delete
          </Button>
          <Button
            className={button}
            endIcon={<HiArrowNarrowRight className={arrowIcon} />}
            onClick={showModal}
          >
            More details
          </Button>
        </Grid>
      </Grid>
      <AlertMessage
        visible={showMessage}
        message={message}
        onClose={setShowMessage}
      />
    </Paper>
  );
};

FlightCard.propTypes = {
  flight: object,
  showModal: func,
  onUpdateData: func.isRequired,
};

FlightCard.defaultProps = {
  flight: null,
  showModal: () => {},
};

export default FlightCard;
