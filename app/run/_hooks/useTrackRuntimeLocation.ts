import { useCallback, useEffect, useRef, useState } from "react";

export const useTrackRuntimeLocation = () => {
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [coords, setCoords] = useState<
    {
      latitude: number;
      longitude: number;
    }[]
  >([]);
  const watcherRef = useRef<number>();

  useEffect(() => {
    if (isTracking) {
      console.log("Started traking user location");
      watcherRef.current = navigator.geolocation.watchPosition(
        ({ coords }) => {
          setCoords((prev) => [
            ...prev,
            {
              latitude: coords.latitude,
              longitude: coords.longitude,
            },
          ]);
        },
        ({ message }) => {
          console.log(message);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 5000,
        }
      );
    } else {
      // To direct user to accept location permissions
      navigator.geolocation.getCurrentPosition(() => {});
    }

    return () => {
      if (watcherRef.current) {
        navigator.geolocation.clearWatch(watcherRef.current);
        console.log("Stopped traking user location");
      }
    };
  }, [isTracking]);

  const startTracking = useCallback(() => {
    setIsTracking(true);
  }, []);
  const stopTracking = useCallback(() => {
    setIsTracking(false);
  }, []);

  return { coords, startTracking, stopTracking };
};
