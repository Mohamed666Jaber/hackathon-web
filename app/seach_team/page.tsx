"use client"

import { useState } from "react"
import { Users, X, Check, ArrowLeft, Trophy, Calendar, Clock } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  avatar: string
}

interface Team {
  id: string
  name: string
  sport: string
  emoji: string
  members: TeamMember[]
  maxMembers: number
  skillLevel: "beginner" | "intermediate" | "advanced"
  description: string
  createdBy: string
  leader: string
  practiceDate: string
  practiceTime: string
}

interface Sport {
  id: string
  name: string
  emoji: string
  description: string
  teamCount: number
}

const sports: Sport[] = [
  { id: "tennis", name: "Tennis", emoji: "🎾", description: "Competitive and casual tennis", teamCount: 2 },
  { id: "basketball", name: "Basketball", emoji: "🏀", description: "Basketball competitions", teamCount: 3 },
  { id: "football", name: "Football", emoji: "⚽", description: "Football matches and training", teamCount: 2 },
  { id: "volleyball", name: "Volleyball", emoji: "🏐", description: "Volleyball teams", teamCount: 1 },
  { id: "pool", name: "Pool", emoji: "🎱", description: "Pool and billiards", teamCount: 1 },
  { id: "gym", name: "Gym", emoji: "💪", description: "Fitness and gym training", teamCount: 2 },
]

const allTeams: Team[] = [
  {
    id: "1",
    name: "Tennis Masters",
    sport: "tennis",
    emoji: "🎾",
    members: [
      { id: "1", name: "Ahmed", avatar: "👨‍🎓" },
      { id: "2", name: "Fatima", avatar: "👩‍🎓" },
      { id: "3", name: "Mohamed", avatar: "👨‍🎓" },
      { id: "4", name: "Layla", avatar: "👩‍🎓" },
    ],
    maxMembers: 6,
    skillLevel: "intermediate",
    description: "Competitive tennis team for all levels",
    createdBy: "Ahmed",
    leader: "Ahmed",
    practiceDate: "Monday & Wednesday",
    practiceTime: "4:00 PM - 6:00 PM",
  },
  {
    id: "2",
    name: "Tennis Beginners",
    sport: "tennis",
    emoji: "🎾",
    members: [
      { id: "1", name: "Sara", avatar: "👩‍🎓" },
      { id: "2", name: "Ali", avatar: "👨‍🎓" },
    ],
    maxMembers: 4,
    skillLevel: "beginner",
    description: "Learn tennis together",
    createdBy: "Sara",
    leader: "Sara",
    practiceDate: "Tuesday & Thursday",
    practiceTime: "3:00 PM - 4:30 PM",
  },
  {
    id: "3",
    name: "Basketball Crew",
    sport: "basketball",
    emoji: "🏀",
    members: [
      { id: "1", name: "Omar", avatar: "👨‍🎓" },
      { id: "2", name: "Zainab", avatar: "👩‍🎓" },
      { id: "3", name: "Hassan", avatar: "👨‍🎓" },
      { id: "4", name: "Noor", avatar: "👩‍🎓" },
      { id: "5", name: "Ali", avatar: "👨‍🎓" },
    ],
    maxMembers: 5,
    skillLevel: "advanced",
    description: "Advanced basketball players",
    createdBy: "Omar",
    leader: "Omar",
    practiceDate: "Monday & Friday",
    practiceTime: "5:00 PM - 7:00 PM",
  },
  {
    id: "4",
    name: "Basketball Casual",
    sport: "basketball",
    emoji: "🏀",
    members: [
      { id: "1", name: "Karim", avatar: "👨‍🎓" },
      { id: "2", name: "Mona", avatar: "👩‍🎓" },
    ],
    maxMembers: 6,
    skillLevel: "beginner",
    description: "Casual basketball fun",
    createdBy: "Karim",
    leader: "Karim",
    practiceDate: "Wednesday & Saturday",
    practiceTime: "4:00 PM - 5:30 PM",
  },
  {
    id: "5",
    name: "Basketball Pro",
    sport: "basketball",
    emoji: "🏀",
    members: [
      { id: "1", name: "Jamal", avatar: "👨‍🎓" },
      { id: "2", name: "Leila", avatar: "👩‍🎓" },
      { id: "3", name: "Tariq", avatar: "👨‍🎓" },
    ],
    maxMembers: 7,
    skillLevel: "advanced",
    description: "Professional basketball team",
    createdBy: "Jamal",
    leader: "Jamal",
    practiceDate: "Tuesday & Thursday",
    practiceTime: "6:00 PM - 8:00 PM",
  },
  {
    id: "6",
    name: "Volleyball Squad",
    sport: "volleyball",
    emoji: "🏐",
    members: [
      { id: "1", name: "Mariam", avatar: "👩‍🎓" },
      { id: "2", name: "Ibrahim", avatar: "👨‍🎓" },
      { id: "3", name: "Leila", avatar: "👩‍🎓" },
      { id: "4", name: "Yassin", avatar: "👨‍🎓" },
      { id: "5", name: "Hana", avatar: "👩‍🎓" },
      { id: "6", name: "Tariq", avatar: "👨‍🎓" },
    ],
    maxMembers: 6,
    skillLevel: "beginner",
    description: "Casual volleyball for beginners",
    createdBy: "Mariam",
    leader: "Mariam",
    practiceDate: "Monday & Thursday",
    practiceTime: "3:30 PM - 5:00 PM",
  },
  {
    id: "7",
    name: "Gym Buddies",
    sport: "gym",
    emoji: "💪",
    members: [
      { id: "1", name: "Adel", avatar: "👨‍🎓" },
      { id: "2", name: "Sophia", avatar: "👩‍🎓" },
      { id: "3", name: "Jamal", avatar: "👨‍🎓" },
    ],
    maxMembers: 8,
    skillLevel: "beginner",
    description: "Fitness and gym training group",
    createdBy: "Adel",
    leader: "Adel",
    practiceDate: "Monday, Wednesday & Friday",
    practiceTime: "7:00 AM - 8:00 AM",
  },
  {
    id: "8",
    name: "Gym Warriors",
    sport: "gym",
    emoji: "💪",
    members: [
      { id: "1", name: "Rashid", avatar: "👨‍🎓" },
      { id: "2", name: "Nadia", avatar: "👩‍🎓" },
    ],
    maxMembers: 5,
    skillLevel: "intermediate",
    description: "Advanced gym training",
    createdBy: "Rashid",
    leader: "Rashid",
    practiceDate: "Tuesday & Friday",
    practiceTime: "6:00 AM - 7:30 AM",
  },
  {
    id: "9",
    name: "Pool Masters",
    sport: "pool",
    emoji: "🎱",
    members: [
      { id: "1", name: "Khaled", avatar: "👨‍🎓" },
      { id: "2", name: "Rania", avatar: "👩‍🎓" },
      { id: "3", name: "Hassan", avatar: "👨‍🎓" },
    ],
    maxMembers: 6,
    skillLevel: "intermediate",
    description: "Pool and billiards team",
    createdBy: "Khaled",
    leader: "Khaled",
    practiceDate: "Wednesday & Saturday",
    practiceTime: "7:00 PM - 9:00 PM",
  },
  {
    id: "10",
    name: "Football United",
    sport: "football",
    emoji: "⚽",
    members: [
      { id: "1", name: "Samir", avatar: "👨‍🎓" },
      { id: "2", name: "Fatma", avatar: "👩‍🎓" },
      { id: "3", name: "Youssef", avatar: "👨‍🎓" },
    ],
    maxMembers: 11,
    skillLevel: "intermediate",
    description: "Football team for matches",
    createdBy: "Samir",
    leader: "Samir",
    practiceDate: "Tuesday & Thursday",
    practiceTime: "5:00 PM - 6:30 PM",
  },
  {
    id: "11",
    name: "Football Casual",
    sport: "football",
    emoji: "⚽",
    members: [
      { id: "1", name: "Bilal", avatar: "👨‍🎓" },
      { id: "2", name: "Hana", avatar: "👩‍🎓" },
    ],
    maxMembers: 8,
    skillLevel: "beginner",
    description: "Casual football matches",
    createdBy: "Bilal",
    leader: "Bilal",
    practiceDate: "Wednesday & Saturday",
    practiceTime: "4:00 PM - 5:30 PM",
  },
]

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function Avatar({ name }: { name: string }) {
  const initials = getInitials(name)
  const colors = ["bg-emerald-500", "bg-teal-500", "bg-emerald-600", "bg-teal-600", "bg-emerald-400"]
  const colorIndex = name.charCodeAt(0) % colors.length

  return (
    <div
      className={`${colors[colorIndex]} w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm`}
    >
      {initials}
    </div>
  )
}

export default function SportsCategoriesPage() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [joinedTeams, setJoinedTeams] = useState<string[]>([])

  const sportTeams = selectedSport ? allTeams.filter((team) => team.sport === selectedSport) : []

  const handleJoinTeam = (teamId: string) => {
    if (!joinedTeams.includes(teamId)) {
      setJoinedTeams([...joinedTeams, teamId])
    }
  }

  const hasSpot = (team: Team) => team.members.length < team.maxMembers
  const isUserJoined = (teamId: string) => joinedTeams.includes(teamId)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-emerald-500/20 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Sports Hub
              </h1>
              <p className="text-sm text-gray-400 mt-1">Find and join your favorite teams</p>
            </div>
            <Trophy className="text-emerald-400" size={32} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {!selectedSport ? (
          <>
            {/* Sports Grid */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-200 mb-6">Browse Sports</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sports.map((sport) => (
                  <button
                    key={sport.id}
                    onClick={() => setSelectedSport(sport.id)}
                    className="group relative overflow-hidden rounded-xl border border-emerald-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 transition-all duration-300 hover:border-emerald-400/60 hover:from-slate-800/80 hover:to-slate-900/80 hover:shadow-lg hover:shadow-emerald-500/10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300" />
                    <div className="relative">
                      <div className="text-5xl mb-4">{sport.emoji}</div>
                      <h3 className="text-lg font-bold text-emerald-400 mb-2">{sport.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{sport.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-emerald-300">
                          {sport.teamCount} team{sport.teamCount !== 1 ? "s" : ""}
                        </span>
                        <span className="text-emerald-400 text-lg">→</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Back Button & Header */}
            <div className="mb-8">
              <button
                onClick={() => {
                  setSelectedSport(null)
                  setSelectedTeam(null)
                }}
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition mb-6 font-semibold"
              >
                <ArrowLeft size={20} />
                Back to Sports
              </button>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{sports.find((s) => s.id === selectedSport)?.emoji}</span>
                <div>
                  <h1 className="text-4xl font-bold text-white">{sports.find((s) => s.id === selectedSport)?.name}</h1>
                  <p className="text-gray-400 mt-1">
                    {sportTeams.length} team{sportTeams.length !== 1 ? "s" : ""} available
                  </p>
                </div>
              </div>
            </div>

            {/* Teams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sportTeams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                  className="group relative overflow-hidden rounded-xl border border-emerald-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 transition-all duration-300 hover:border-emerald-400/60 hover:from-slate-800/80 hover:to-slate-900/80 hover:shadow-lg hover:shadow-emerald-500/10 text-left"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-3xl mb-2">{team.emoji}</div>
                        <h3 className="text-lg font-bold text-emerald-400">{team.name}</h3>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {team.skillLevel.charAt(0).toUpperCase() + team.skillLevel.slice(1)}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{team.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center gap-2">
                          <Users size={16} />
                          Members
                        </span>
                        <span className="text-emerald-400 font-semibold">
                          {team.members.length}/{team.maxMembers}
                        </span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-300"
                          style={{ width: `${(team.members.length / team.maxMembers) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Team Detail Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-emerald-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-emerald-500/10">
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-emerald-500/20 bg-slate-800/80 backdrop-blur">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedTeam.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold text-emerald-400">{selectedTeam.name}</h2>
                  <p className="text-gray-400 text-sm">Led by {selectedTeam.leader}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTeam(null)}
                className="p-2 hover:bg-emerald-500/10 rounded-lg transition text-gray-400 hover:text-emerald-400"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">About</h3>
                <p className="text-gray-300 leading-relaxed">{selectedTeam.description}</p>
              </div>

              {/* Team Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-700/30 border border-emerald-500/20 rounded-lg">
                  <p className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">Skill Level</p>
                  <p className="text-emerald-400 font-semibold">
                    {selectedTeam.skillLevel.charAt(0).toUpperCase() + selectedTeam.skillLevel.slice(1)}
                  </p>
                </div>
                <div className="p-4 bg-slate-700/30 border border-emerald-500/20 rounded-lg">
                  <p className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">Members</p>
                  <p className="text-emerald-400 font-semibold">
                    {selectedTeam.members.length}/{selectedTeam.maxMembers}
                  </p>
                </div>
                <div className="p-4 bg-slate-700/30 border border-emerald-500/20 rounded-lg col-span-2">
                  <p className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide flex items-center gap-2">
                    <Calendar size={14} /> Practice Schedule
                  </p>
                  <p className="text-emerald-400 font-semibold text-sm">{selectedTeam.practiceDate}</p>
                  <p className="text-teal-400 font-semibold text-sm flex items-center gap-2 mt-1">
                    <Clock size={14} /> {selectedTeam.practiceTime}
                  </p>
                </div>
              </div>

              {/* Members Section */}
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-4">Team Members</h3>
                <div className="flex flex-wrap gap-4">
                  {selectedTeam.members.map((member) => (
                    <div key={member.id} className="flex flex-col items-center gap-2">
                      <Avatar name={member.name} />
                      <p className="text-gray-300 text-sm font-medium">{member.name}</p>
                    </div>
                  ))}
                  {hasSpot(selectedTeam) && (
                    <button
                      onClick={() => handleJoinTeam(selectedTeam.id)}
                      className="w-12 h-12 flex items-center justify-center bg-emerald-500/20 border-2 border-emerald-500 rounded-full hover:bg-emerald-500/40 transition text-xl font-bold text-emerald-400 hover:scale-110"
                    >
                      +
                    </button>
                  )}
                </div>
              </div>

              {/* Join Button */}
              <button
                onClick={() => handleJoinTeam(selectedTeam.id)}
                disabled={!hasSpot(selectedTeam) || isUserJoined(selectedTeam.id)}
                className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: isUserJoined(selectedTeam.id)
                    ? "rgba(16, 185, 129, 0.1)"
                    : hasSpot(selectedTeam)
                      ? "linear-gradient(135deg, rgb(16, 185, 129), rgb(20, 184, 166))"
                      : "rgba(100, 116, 139, 0.3)",
                  color: isUserJoined(selectedTeam.id)
                    ? "rgb(16, 185, 129)"
                    : hasSpot(selectedTeam)
                      ? "white"
                      : "rgb(148, 163, 184)",
                  border: `1px solid ${
                    isUserJoined(selectedTeam.id)
                      ? "rgba(16, 185, 129, 0.5)"
                      : hasSpot(selectedTeam)
                        ? "rgba(16, 185, 129, 0.3)"
                        : "rgba(100, 116, 139, 0.3)"
                  }`,
                }}
              >
                {isUserJoined(selectedTeam.id) ? (
                  <>
                    <Check size={20} />
                    Joined
                  </>
                ) : hasSpot(selectedTeam) ? (
                  "Join Team"
                ) : (
                  "Team Full"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
