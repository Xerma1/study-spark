import { Topic } from "@/data/topic"

export default function calcTopicScore(topic: Topic) {
    const { studySessions } = topic;

    // If no study sessions, return score 0;
    const validSessions = Array.isArray(studySessions) ? studySessions.filter(Boolean) : [];
    if (validSessions.length === 0) {
        return 0;
    }

    // Go to the most recent valid study session
    const mostRecentSession = validSessions[validSessions.length - 1];
    if (!mostRecentSession) {
        return 0;
    }
    // Get the level of confidence and date
    const { levelOfConfidence, date } = mostRecentSession;
    // Parse the date into the Date object
    const sessionDate = new Date(date);
    const now = new Date();
    sessionDate.setHours(0,0,0,0);
    now.setHours(0,0,0,0);  
    const diffMs = sessionDate.getTime() - now.getTime();
    // Convert milliseconds to days
    const diffDays = -(Math.round(diffMs / (1000 * 60 * 60 * 24)));

    // Check the level of confidence and the diffDays and produce a score
    const baseMultipliers: Record<string, number> = {
        Low: 0.3,
        Medium: 0.7,
        High: 1
    }
    const penaltyMultipliers: Record<string, number> = {
        Low: 0.5,
        Medium: 0.5,
        High: 0.5,
    };
    const thresholds: Record<number, number> = {
        1: 3,
        2: 7,
        3: 11,
    };

    const base = baseMultipliers[levelOfConfidence] ?? 1;
    const penalty = penaltyMultipliers[levelOfConfidence] ?? 1;
    const length = Math.min(validSessions.length, 3); // use validSessions here!
    const threshold = thresholds[length] ?? 11;

    let score: number;
    if (levelOfConfidence === "High") {
        score = diffDays >= threshold ? 100 * penalty : 100;
    } else {
        score = diffDays >= threshold ? 100 * base * penalty : 100 * base;
    }

    return score;
}