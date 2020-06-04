import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiInfo,
  FiCheckCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';
import { Container } from './styles';

interface ToastProps {
  data: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ data, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(data.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [data.id, removeToast]);
  return (
    <Container
      type={data.type}
      hasDescription={!!data.description}
      style={style}
    >
      {icons[data.type || 'info']}

      <div>
        <strong>{data.title}</strong>
        {data.description && <p>{data.description}</p>}
      </div>

      <button type="submit" onClick={() => removeToast(data.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
