import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { fetchAllUsers, getMatchedUser } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { matchUsers } from "@/lib/supabase";

interface User {
  id: number;
  name: string;
  photo: string;
}

const UserSpinner: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [animationStopped, setAnimationStopped] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Check if user is already matched
  useEffect(() => {
    const checkMatchStatus = async () => {
      if (user?.id) {
        const matchedUserId = await getMatchedUser(user.id);
        if (matchedUserId) {
          // If there's a match, fetch the matched user's details
          const allUsers = await fetchAllUsers();
          const matchedUserDetails = allUsers?.find(u => u.id.toString() === matchedUserId);
          if (matchedUserDetails) {
            setMatchedUser({
              id: matchedUserDetails.id,
              name: matchedUserDetails.name,
              photo: matchedUserDetails.photo_url
            });
            setIsMatched(true);
          }
        }
      }
    };

    checkMatchStatus();
  }, [user]);

  // Fetch available users
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await fetchAllUsers();
      if (fetchedUsers) {
        const filteredUsers = fetchedUsers
          .filter((userData) => {
            return userData.id !== user?.id && userData.has_match === false;
          })
          .map((userData) => ({
            id: userData.id,
            name: userData.name,
            photo: userData.photo_url,
          }));

        setUsers(filteredUsers);
      }
    };

    if (user && !isMatched) {
      fetchUsers();
    }
  }, [user, isMatched]);

  const handleSpin = () => {
    setSpinning(true);
    setSelectedUser(null);
    setAnimationStopped(false);
    setShowWinner(false);
    setCurrentPosition(0);

    setTimeout(() => {
      setSpinning(false);
      const randomIndex = Math.floor(Math.random() * users.length);
      const winner = users[randomIndex];
      setSelectedUser(winner);
      setAnimationStopped(true);
      setCurrentPosition(randomIndex);
      setShowWinner(true);

      if (user) {
        matchUsers(user.id, winner.id.toString());
        setIsMatched(true);
        setMatchedUser(winner);
      }

      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== winner.id));
    }, 5000);
  };

  useEffect(() => {
    if (spinning && !animationStopped) {
      intervalRef.current = setInterval(() => {
        setCurrentPosition((prev) => prev + 1);
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [spinning, animationStopped]);

  const visualPosition = currentPosition % users.length;
  const extendedUsers = [...users, ...users, ...users, ...users, ...users, ...users];

  // If user is already matched, show their matched user
  if (isMatched && matchedUser) {
    return (
      <div className="w-full max-w-lg mx-auto my-8">
        <div className="mt-4 text-center transition-all duration-500 ease-in-out">
          <h3 className="text-2xl font-bold text-green-500">
            Çekiliş arkadaşın: {matchedUser.name}
          </h3>
          <img
            src={matchedUser.photo}
            alt={matchedUser.name}
            className="w-48 h-48 rounded-full mx-auto mt-2 transform scale-110 transition-all duration-500 ease-in-out"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto my-8">
      {!showWinner && (
        <>
          <div className="relative overflow-hidden">
            <div
              ref={spinnerRef}
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentPosition * 150}px)`,
              }}
            >
              {extendedUsers.map((user, index) => (
                <div
                  key={`${user.id}-${index}`}
                  className={`flex flex-col justify-center items-center mx-4 transform transition-all duration-500 ease-out ${
                    !spinning &&
                    selectedUser?.id === user.id &&
                    visualPosition === index % users.length
                      ? "scale-100 z-10"
                      : visualPosition === index % users.length
                      ? "scale-100 z-10"
                      : "scale-90"
                  }`}
                >
                  <div className="w-32 h-32 relative rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-sm font-medium mt-2">{user.name}</p>
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={handleSpin}
            className="p-2 text-white rounded my-6 ml-4"
            disabled={spinning}
          >
            {spinning ? "Spinning..." : "Start Spin"}
          </Button>
        </>
      )}

      {selectedUser && !spinning && showWinner && (
        <div className="mt-4 text-center transition-all duration-500 ease-in-out">
          <h3 className="text-2xl font-bold text-green-500">
            Çekiliş arkadaşın: {selectedUser.name}
          </h3>
          <img
            src={selectedUser.photo}
            alt={selectedUser.name}
            className="w-48 h-48 rounded-full mx-auto mt-2 transform scale-110 transition-all duration-500 ease-in-out"
          />
        </div>
      )}
    </div>
  );
};

export default UserSpinner;