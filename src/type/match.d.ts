declare module MatchDetailModule {
    interface Data {
        has_lineup: boolean;
        has_tracker: boolean;
        commentators: Commentator[];
        play_urls: PlayUrl[];
        id: string;
    }

    interface Commentator {
        id: string;
        name: string;
        avatar: string;
        url: string;
    }

    interface PlayUrl {
        name: string;
        cdn: string;
        url: string;
        role: string;
    }
}
declare module MatchModule {
    interface Root {
        status: number;
        data: Matchs[];
    }

    interface Matchs {
        key_sync: string;
        name: string;
        slug: string;
        date: string;
        timestamp: number;
        home_red_cards: number;
        away_red_cards: number;
        home: Home;
        away: Away;
        tournament: Tournament;
        scores: Scores;
        win_code: number;
        match_status: string;
        sport_type: string;
        has_lineup: boolean;
        has_tracker: boolean;
        is_featured: boolean;
        thumbnail_url: any;
        commentators?: Commentator[];
        is_live: boolean;
        id: string;
        live_tracker?: string;
        room_id?: string;
        time_str?: string;
        parse_data?: ParseData;
    }

    interface Home {
        name: string;
        short_name: string;
        gender?: string;
        name_code?: string;
        slug: string;
        logo: string;
        id: string;
    }

    interface Away {
        name: string;
        short_name: string;
        gender?: string;
        name_code?: string;
        slug: string;
        logo: string;
        id: string;
    }

    interface Tournament {
        name: string;
        logo: string;
        unique_tournament: UniqueTournament;
        priority: number;
    }

    interface UniqueTournament {
        name: string;
        slug: string;
        logo: string;
        is_featured: boolean;
        priority: number;
        id: string;
    }

    interface Scores {
        home: number;
        away: number;
        detail: any;
        sport_type: string;
    }

    interface Commentator {
        id: string;
        name: string;
        avatar: string;
        url: string;
    }

    interface ParseData {
        status: string;
        time: string;
    }
}
