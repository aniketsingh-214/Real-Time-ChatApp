import { useEffect, useState, useCallback } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    setMessage([]);
    setPage(1);
    setHasMore(true);
  }, [selectedConversation, setMessage]);

  const getMessages = useCallback(async (currentPage = 1) => {
    if (!selectedConversation?._id) return;
    
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/message/get/${selectedConversation._id}?page=${currentPage}&limit=20`,
        { withCredentials: true }
      );
      
      const newMessages = res.data;
      if (newMessages.length < 20) {
        setHasMore(false);
      }
      
      if (currentPage === 1) {
        setMessage(newMessages);
      } else {
        setMessage((prev) => [...newMessages, ...prev]);
      }
    } catch (error) {
      // Error handled by UI fallback
    } finally {
      setLoading(false);
    }
  }, [selectedConversation, setMessage]);

  useEffect(() => {
    if (selectedConversation && page === 1) {
      getMessages(1);
    }
  }, [selectedConversation, getMessages, page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => {
        const nextPage = prev + 1;
        getMessages(nextPage);
        return nextPage;
      });
    }
  };

  return { loading, messages, hasMore, loadMore };
};

export default useGetMessage;
